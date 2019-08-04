import {
    Kind,
    visit,
    DocumentNode,
    OperationDefinitionNode,
    DirectiveNode,
    VariableNode,
    VariableDefinitionNode
} from 'graphql'
import * as R from 'ramda'
import { visit as visitField } from './field'
import { visit as visitArgument } from './argument'
import { visit as visitDirective } from './directive'
import { visit as visitVariable } from  './variable'
import * as consts from './consts'
import { strip } from './strip';


export const dataTransform = (directives: Record<string, any>) => (astNode: DocumentNode, variables: any = {}): any => visit(astNode, {
    [Kind.DIRECTIVE]: visitDirective(directives),
    [Kind.ARGUMENT]: visitArgument,
    [Kind.FIELD]: visitField,
    [Kind.OPERATION_DEFINITION]: {
        leave: (node: OperationDefinitionNode) => R.mergeAll(node.selectionSet.selections)
    },
    [Kind.DOCUMENT]: {
        leave: (node: DocumentNode): any => R.evolve({
            // @ts-ignore
            data: R.mergeAll(node.definitions)
        })
    },
    [Kind.VARIABLE]: visitVariable(variables),
    [Kind.VARIABLE_DEFINITION]: {
        enter: (node: VariableDefinitionNode) => node,
        leave: (node: VariableDefinitionNode) => node
    }
})

export const getUsedVariables = (astNode: DocumentNode) => {
    const usedVariables: string[] = []

    visit(astNode, {
        [Kind.VARIABLE]: node => {
            usedVariables.push(node.name.value)
            return node
        },
        [Kind.VARIABLE_DEFINITION]: node => {
            return null
        }
    })
    return usedVariables
}

export const variablesTransform = <T>(directives: Record<string, T>) => (astNode: DocumentNode, variables = {}) => {

    const strippedQuery = strip(directives)(astNode)
    const usedVariables = getUsedVariables(strippedQuery)

    return visit(astNode, {
        [Kind.DIRECTIVE]: {
            leave: (node: any) => {

                if (node.name.value !== 'VariablesTransform') {
                    return null
                }
                const args = R.mergeAll(node.arguments || [])
                //@ts-ignore
                return R.pipe(
                    //@ts-ignore
                    R.mapObjIndexed(([directive, props]: [string, any]) => directives[directive](props)),
                    R.evolve
                )(args)
            }
        },
        [Kind.OPERATION_DEFINITION]: {
            leave: (node: OperationDefinitionNode) => {
                const transforms = node.directives || []

                if ( transforms.length === 0) {
                    return R.identity
                }
                // @ts-ignore
                return R.pipe(...transforms)
            }
        },
        [Kind.DOCUMENT]: {
            leave: (node: DocumentNode): any => {
                return R.pipe(
                    // @ts-ignore
                    node.definitions[0],
                    R.pick(usedVariables)
                )
            }
        },
        [Kind.VARIABLE]: visitVariable(variables),
        [Kind.ARGUMENT]: visitArgument
    })

}