import {
    Kind,
    visit,
    DocumentNode,
    ObjectFieldNode,
    OperationDefinitionNode,
    FieldNode,
    ArgumentNode,
    DirectiveNode,
    ValueNode
} from 'graphql/language'
import * as R from 'ramda'
import * as consts from './consts'

export const kindEquals = (kind: string) =>
    R.pipe(
        R.prop('kind'),
        R.equals(kind)
    ) as (arg: { kind: string }) => boolean

export const convertArgument: (arg: ValueNode) => object = R.cond([
    [kindEquals(consts.STRING_VALUE), R.prop('value')],
    [
        kindEquals(consts.INT_VALUE),
        R.pipe(
            R.prop('value'),
            parseInt
        )
    ],
    [
        kindEquals(consts.BOOLEAN_VALUE),
        R.pipe(
            R.prop('value'),
            Boolean
        )
    ],
    [
        kindEquals(consts.FLOAT_VALUE),
        R.pipe(
            R.prop('value'),
            parseFloat
        )
    ],
    [
        kindEquals(consts.OBJECT_VALUE),
        R.pipe(
            R.prop('fields'),
            R.reduce(
                (fields, field: ObjectFieldNode): object => ({
                    ...fields,
                    [field.name.value]: convertArgument(field.value)
                }),
                {}
            )
        )
    ],
    [
        kindEquals(consts.LIST_VALUE),
        R.pipe(
            R.prop('values'),
            R.map((arg: ValueNode): object => convertArgument(arg))
        )
    ],
    [R.T, R.always(R.prop('value'))]
])

export const dataTransform = (directives: Record<string, any>, astNode: DocumentNode): any => visit(astNode, {
    [Kind.DIRECTIVE]: {
        leave: (node: DirectiveNode) => {

            const args = R.mergeAll(node.arguments || [])
            const directive = directives[node.name.value]

            if (!directive) return null

            return directive(args)
        }
    },
    [Kind.ARGUMENT]: {
        leave: (node: ArgumentNode) => {
            return {
                [node.name.value]: convertArgument(node.value)
            }
        }
    },
    [Kind.FIELD]: {
        leave: (node: Partial<FieldNode>) => {
            // field is nested object or array
            if (node.selectionSet) {
                return {
                    [R.path(['name', 'value'], node) as string]: R.mergeAll(node.selectionSet.selections)
                }
            }
            // @ts-ignore
            const directives : ((args: any) => any)[] = node.directives || []
            // don't include transform fields for fields  without transform directives
            if (!directives || directives.length === 0) {
                return null
            }

            return {
                [R.path(['name', 'value'], node) as string]: R.pipe(
                    // @ts-ignore
                    ...node.directives
                )
            }
        }
    },

    [Kind.OPERATION_DEFINITION]: {
        leave: (node: OperationDefinitionNode) => {
            return R.mergeAll(node.selectionSet.selections)
        }
    },
    [Kind.DOCUMENT]: {
        leave: (node: DocumentNode): any => R.evolve({
            // @ts-ignore
            data: R.mergeAll(node.definitions)
        })
    }
})