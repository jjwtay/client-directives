import { parse } from 'graphql'
import { clientDirectives } from '@client-directives/core'
import { path } from '../src'

describe('path', () => {
    it('should retrieve the field by path', () => {
        const test = parse(`{
            getFoo @path(value: ["foo", "bar"]) {
                foo {
                    bar 
                }
            }
        }`)

        const { dataTransformer } = clientDirectives({ path })(test)

        expect(dataTransformer({
            data: {
                getFoo: {
                    foo: {
                        bar: 'baz'
                    }
                }
            }
        })).toEqual({
            data: {
                getFoo: 'baz'
            }
        })
    })
})