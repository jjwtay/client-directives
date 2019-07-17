import { Kind, visit, DocumentNode } from 'graphql/language'

export const data = (directives: Record<string, any>, astNode: DocumentNode) => visit(astNode, {
    [Kind.DIRECTIVE]: node => {
        if (node.name.value === 'add1') {
            return (val: number) => val + 1
        }

        return (val: any) => val
    }
})