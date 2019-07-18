import {
    Kind,
    visit,
    DocumentNode,
    OperationDefinitionNode,
    DirectiveNode
} from 'graphql'
import * as R from 'ramda'
import { visit as visitField } from './field'
import { visit as visitArgument } from './argument'
import { visit as visitDirective } from './directive'

export const dataTransform = (directives: Record<string, any>, astNode: DocumentNode): any => visit(astNode, {
    [Kind.DIRECTIVE]: visitDirective(directives),
    [Kind.ARGUMENT]: visitArgument,
    [Kind.FIELD]: visitField,
    [Kind.OPERATION_DEFINITION]: {
        leave: (node: OperationDefinitionNode) => {
            return R.mergeAll(node.selectionSet.selections)
        }
    },
    [Kind.DOCUMENT]: {
        leave: (node: DocumentNode): any => {
            return R.evolve({
                // @ts-ignore
                data: R.mergeAll(node.definitions)
            })
        }
    }
})