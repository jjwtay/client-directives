import { Kind, visit, DocumentNode } from 'graphql/language'

export const strip = (directives: Record<string, any>, queryAST: DocumentNode) => visit(queryAST, {
    [Kind.DIRECTIVE]: node => {
        if (Object.keys(directives).includes(node.name.value)) {
            return null
        }
    }
})
