import { ArgumentNode, ValueNode, ObjectFieldNode } from 'graphql'
import * as R from 'ramda'
import * as consts from './consts'

export const kindEquals = (kind: string) =>
    R.pipe(
        R.prop('kind'),
        R.equals(kind)
    ) as (arg: { kind: string }) => boolean

export const convertArgument: (arg: ValueNode) => object = R.cond([
    [kindEquals(consts.STRING_VALUE), R.prop('value')],
    [
        kindEquals(consts.INT_VALUE),
        R.pipe(
            R.prop('value'),
            parseInt
        )
    ],
    [
        kindEquals(consts.BOOLEAN_VALUE),
        R.pipe(
            R.prop('value'),
            Boolean
        )
    ],
    [
        kindEquals(consts.FLOAT_VALUE),
        R.pipe(
            R.prop('value'),
            parseFloat
        )
    ],
    [
        kindEquals(consts.OBJECT_VALUE),
        R.pipe(
            R.prop('fields'),
            R.reduce(
                (fields, field: ObjectFieldNode): object => ({
                    ...fields,
                    [field.name.value]: convertArgument(field.value)
                }),
                {}
            )
        )
    ],
    [
        kindEquals(consts.LIST_VALUE),
        R.pipe(
            R.prop('values'),
            R.map((arg: ValueNode): object => convertArgument(arg))
        )
    ],
    [R.T, R.always(R.prop('value'))]
])

export const visit = {
    leave: (node: ArgumentNode) => {
        console.log('argument visit', node)
        return {
            [node.name.value]: convertArgument(node.value)
        }
    }
}