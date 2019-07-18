import {
    Kind,
    visit,
    DocumentNode,
    OperationDefinitionNode,
    DirectiveNode,
    VariableNode
} from 'graphql'
import * as R from 'ramda'
import { visit as visitField } from './field'
import { visit as visitArgument } from './argument'
import { visit as visitDirective } from './directive'
import { visit as visitVariable } from  './variable'
import * as consts from './consts'


export const dataTransform = (directives: Record<string, any>) => (astNode: DocumentNode, variables?: any): any => visit(astNode, {
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
    },
    [Kind.VARIABLE]: visitVariable(variables)
})