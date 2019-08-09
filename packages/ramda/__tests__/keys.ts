import { parse } from 'graphql'
import { clientDirectives } from '@client-directives/core'
import { keys }from '../src'

describe('keys', () => {
    it('should convert to array of keys', () => {
        const test = parse(`{
            getFoo @keys {
                foo
                bar
                baz
                bleh
            }
        }`)

        const { dataTransformer } = clientDirectives({ keys })(test)

        expect(dataTransformer({
            data: {
                getFoo: {
                    foo: 1,
                    bar: 2,
                    baz: 3,
                    bleh: 4
                }
            }
        })).toEqual({
            data: {
                getFoo: ['foo', 'bar', 'baz', 'bleh']
            }
        })
    })
})
