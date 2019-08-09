import { parse } from 'graphql'
import { clientDirectives } from '@client-directives/core'
import { fromPairs }from '../src'

describe('fromPairs', () => {
    it('should convert to object from array of pairs', () => {
        const test = parse(`{
            getFoo {
                foo @fromPairs
            }
        }`)

        const { dataTransformer } = clientDirectives({ fromPairs })(test)

        expect(dataTransformer({
            data: {
                getFoo: {
                    foo: [['a', 1], ['b', 2], ['c', 3]]
                }
            }
        })).toEqual({
            data: {
                getFoo: {
                    foo: {
                        a: 1,
                        b: 2,
                        c: 3
                    }
                }
            }
        })
    })
})