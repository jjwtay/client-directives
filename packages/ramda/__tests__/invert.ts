import { parse } from 'graphql'
import { clientDirectives } from '@client-directives/core'
import { invert }from '../src'

describe('invert', () => {
    it('should invert', () => {
        const test = parse(`{
            getFoo @invert {
                foo
                bar
                baz
                bleh
            }
        }`)

        const { dataTransformer } = clientDirectives({ invert })(test)

        expect(dataTransformer({
            data: {
                getFoo: {
                    foo: 'hello',
                    bar: 'boo',
                    baz: 'hello',
                    bleh: 5
                }
            }
        })).toEqual({
            data: {
                getFoo: {
                    hello: ['foo', 'baz'],
                    boo: ['bar'],
                    5: ['bleh']
                }
            }
        })
    })
})