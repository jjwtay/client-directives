import { DirectiveNode } from 'graphql/language'
import * as R from 'ramda'

export interface LeaveDirective {

}

export const visit = (directives: Record<string, any>) => ({
    leave: (node: DirectiveNode) => {
        const args = R.mergeAll(node.arguments || [])
        const directive = directives[node.name.value]

        if (!directive) return null

        return directive(args)
    }
})