import { dataTransform, variablesTransform } from './transform'
import { strip } from './strip'
import { DocumentNode } from 'graphql/language'

export type ClientDirective = {
    idl: string,
    tranform: (args: object) => any
}

export const clientDirectives = (directives: Record<string, any>) => (astNode: DocumentNode, variables: any = {}) => {
    const query = strip(directives)(astNode)
    const dataTransformer = dataTransform(directives)(astNode, variables)
    const variablesTransformer = variablesTransform(directives)(astNode, variables)
    console.log(variablesTransformer)
    
    return {
        query,
        dataTransformer,
        variablesTransformer
    }
}