import * as R from 'ramda'

export const add = ({ value }: { value: number }) => R.add(value)
export const assoc = ({ key, value }: { key: string, value: any }) => R.assoc(key, value) 
export const assocPath = ({ path, value }: { path: any[], value: any }) => R.assocPath(path, value)
export const clamp = ({ value }: { value: [number, number]  }) => R.clamp(...value)
export const concat = ({ value }: { value: any[] }) => R.concat(R.__, value)
export const contains = ({ value }: { value: any }) => R.contains(value)
export const dec = () => R.dec
export const difference = ({ value }: { value: any[] }) => R.difference(value)
export const dissoc = ({ value }: { value: string }) => R.dissoc(value)
export const dissocPath = ({ value }: { value: string[] }) => R.dissocPath(value)
export const divide = ({ value }: { value: number }) => R.divide(R.__, value)
export const drop = ({ value }: { value: number }) => R.drop(value)
export const dropLast = ({ value }: { value: number }) => R.dropLast(value)
export const dropRepeats = () => R.dropRepeats
export const empty = () => R.empty
export const endsWith = ({ value }: { value: string | any[] }) => R.endsWith(value)
export const equals = ({ value }: { value: any }) => R.equals(value)
export const F = () => R.F
export const fromPairs = () => R.fromPairs
export const gt = ({ value }: { value: number }) => R.gt(value)
export const gte = ({ value }: { value: number }) => R.gte(value)
export const has = ({ value }: { value: any }) => R.has(value)
export const hasPath = ({ value }: { value: any[] }) => R.hasPath(value)
export const head = () => R.head
export const identical = ({ value }: { value: any }) => R.identical(value)
export const inc = () => R.inc
export const includes = ({ value }: { value: any }) => R.includes(value)
export { indexBy } from './indexBy'
export const indexOf = ({ value }: { value: any }) => R.indexOf(value)
export const init = () => R.init
export const insert = ({ at, value }: { at: number, value: any }) => R.insert(at, value)
export const insertAll = ({ at, value }: { at: number, value: any }) => R.insertAll(at, value)
export const intersection = ({ value }: { value: any[] }) => R.intersection(value)
export const intersperse = ({ value }: { value: any }) => R.intersperse(value)
export const invert = () => R.invert
export const invertObj = () => R.invertObj
export const isEmpty = () => R.isEmpty
export const join = ({ value }: { value: string }) => R.join(value)
export const keys = () => R.keys
export const last = () => R.last
// @ts-ignore
export const lastIndexOf = ({ value }: { value: any }) => R.lastIndexOf(value)
export const length = () => R.length
export const lt = ({ value }: { value: number }) => R.lt(value)
export const lte = ({ value }: { value: number }) => R.lte(value)
export const mathMod = ({ value }: { value: number }) => R.mathMod(R.__, value)
export const max = ({ value }: { value: number }) => R.max(value)
export const mean = () => R.mean
export const median = () => R.median

/*
export interface RamdaProps {
    prop?: string
}

export default ({
    prop
}: RamdaProps) => {
    const useRamda: Record<string, any> = {
        prop: R.prop
    }

    return R.pipe<RamdaProps, Array<[string, any]>, any>(
        R.toPairs,
        R.map(([key, value]) => useRamda[key](value))
    )
}
*/