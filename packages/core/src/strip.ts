import { Kind, visit, DocumentNode } from 'graphql/language'
import { getUsedVariables } from './transform';
import { variableDeclaration } from '@babel/types';

export const strip = (directives: Record<string, any>) => (queryAST: DocumentNode) => {

    const firstStrip = visit(queryAST, {
        [Kind.DIRECTIVE]: node => {
            if (Object.keys(directives).concat('VariablesTransform').includes(node.name.value)) {
                return null
            }
        }
    })

    const usedVariables = getUsedVariables(firstStrip)

    return visit(firstStrip, {
        [Kind.VARIABLE_DEFINITION]: node => {
            if (usedVariables.includes(node.variable.name.value)) {
                return node
            }
            return null
        }
    })
}