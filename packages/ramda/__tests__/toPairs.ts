import { parse } from 'graphql'
import { clientDirectives } from '@client-directives/core'
import { toPairs } from '../src'

describe('toPairs', () => {
    it('should convert an object to array of pairs', () => {
        const test = parse(`{
            getFoo @toPairs {
                foo
                bar
                baz
            }
        }`)

        const  { dataTransformer } = clientDirectives({ toPairs })(test)

        expect(dataTransformer({
            data: {
                getFoo: {
                    foo: 'a',
                    bar: 'b',
                    baz: 'c'
                }
            }
        })).toEqual({
            data: {
                getFoo: [
                    ['foo', 'a'],
                    ['bar', 'b'],
                    ['baz', 'c']
                ]
            }
        })
    })
})