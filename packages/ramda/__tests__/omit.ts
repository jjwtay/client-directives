import { parse } from 'graphql'
import { clientDirectives } from '@client-directives/core'
import { omit } from '../src'

describe('omit', () => {
    it('should omit fields bar and baz', () => {
        const test = parse(`{
            getFoo @omit(value: ["bar", "baz"]) {
                foo
                bar
                baz
                bleh
            }
        }`)

        const { dataTransformer } = clientDirectives({ omit })(test)

        expect(dataTransformer({
            data: {
                getFoo: {
                    foo: 'a',
                    bar: 'b',
                    baz: 'c',
                    bleh: 'd'
                }
            }
        })).toEqual({
            data: {
                getFoo: {
                    foo: 'a',
                    bleh: 'd'
                }
            }
        })
    })
})