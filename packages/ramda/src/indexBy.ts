import { indexBy as RIndexBy, path, prop } from 'ramda'

export const indexBy = ({ value }: { value: string | any[] }) => {
    if (Array.isArray(value)) {
        // @ts-ignore
        return RIndexBy(path(value))
    }
    // @ts-ignore
    return RIndexBy(prop(value))
}