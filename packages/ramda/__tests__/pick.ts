import { parse } from 'graphql'
import { clientDirectives } from '@client-directives/core'
import { pick } from '../src'

describe('pick', () => {
    it('should pick bar and baz', () => {
        const test = parse(`{
            getFoo @pick(value: ["bar", "baz"]) {
                foo
                bar
                baz
                bleh
            }
        }`)

        const  { dataTransformer } = clientDirectives({ pick })(test)

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
                    bar: 'b',
                    baz: 'c'
                }
            }
        })
    })
})