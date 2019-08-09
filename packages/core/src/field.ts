import { NameNode, FieldNode } from 'graphql'
import * as R from 'ramda'
import { LeaveDirective } from './directive'

export type LeaveFieldBase = {
    readonly name: NameNode
    readonly directives?: LeaveDirective[]
    readonly selectionSet?: object
}
export type LeaveFieldComplex = {
    readonly selectionSet: {
        readonly selections: readonly object[]
    }
} & LeaveFieldBase

export type LeaveField = LeaveFieldBase | LeaveFieldComplex

const traverseFieldObject = (node: LeaveFieldComplex) => {
    const obj: any = R.mergeAll(node.selectionSet.selections)

    if (!node.directives || node.directives.length === 0) {
        return R.evolve(obj)
    }

    return R.pipe(
        R.evolve(obj),
        // @ts-ignore
        ...node.directives
    )
}

const traverseFieldArray = (node: LeaveFieldComplex) => {
    const obj: any = R.mergeAll(node.selectionSet.selections)

    if (!node.directives || node.directives.length === 0) {
        return R.map(R.evolve(obj))
    }

    return R.pipe(
        R.map(R.evolve(obj)),
        // @ts-ignore
        ...node.directives
    )
}

const traverseFieldSimple = (node: LeaveFieldBase) => {
    if (!node.directives || node.directives.length === 0) {
        return null
    }
    
    return {
        [node.name.value]: R.pipe(
            // @ts-ignore
            ...node.directives
        )
    }
}

export const visit = {
    leave: (node: FieldNode) => {
        if (node.selectionSet) {
            return {
                [node.name.value]: (data: any) => {
                    if (Array.isArray(data)) {
                        return traverseFieldArray(node as LeaveFieldComplex)(data)
                    }

                    return traverseFieldObject(node as LeaveFieldComplex)(data)
                }
            }
        }
        return traverseFieldSimple(node as LeaveFieldBase)
    },
    enter: (node: FieldNode) => {

        if (node.alias) {
            return R.assocPath(['name', 'value'], node.alias.value, node)
        }
        return node
    }
}