import { VariableNode } from 'graphql'
import * as consts from './consts'

const getVariableType = (variable: any) => {
    if (parseInt(variable) === variable) {
        return consts.INT_VALUE
    } else if (parseFloat(variable) === variable) {
        return consts.FLOAT_VALUE
    } else if (!!variable === variable) {
        return consts.BOOLEAN_VALUE
    }
    return consts.STRING_VALUE
}

export const visit = (variables: any) => ({
    leave: (node: VariableNode): any => {
        return {
            kind: getVariableType(variables[node.name.value]),
            value: variables[node.name.value]
        }
    }
})