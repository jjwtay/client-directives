import { dataTransform } from './transform'
import { strip } from './strip'
import { DocumentNode } from 'graphql/language'

export type ClientDirective = {
    idl: string,
    tranform: (args: object) => any
}

export const clientDirective = (directives: Record<string, any>, astNode: DocumentNode) => {
    const graphql = strip(directives, astNode)
    const transform = dataTransform(directives, astNode)
    
    return {
        graphql,
        transform
    }
}