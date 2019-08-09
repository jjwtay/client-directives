import { parse } from 'graphql'
import { clientDirectives } from '@client-directives/core'
import { invertObj }from '../src'

describe('invertObj', () => {
    it('should invert an object', () => {
        const test = parse(`{
            getFoo @invertObj {
                foo
                bar
                baz
                bleh
            }
        }`)

        const { dataTransformer } = clientDirectives({ invertObj })(test)

        expect(dataTransformer({
            data: {
                getFoo: {
                    foo: 'hello',
                    bar: 5,
                    baz: 'hello',
                    bleh: 'banana'
                }
            }
        })).toEqual({
            data: {
                getFoo: {
                    hello: 'baz',
                    5: 'bar',
                    banana: 'bleh'
                }
            }
        })
    })
})