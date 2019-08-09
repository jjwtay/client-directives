import { parse } from 'graphql'
import { clientDirectives } from '@client-directives/core'
import { dissocPath }from '../src'

describe('dissocPath', () => {
    it('should remove by path', () => {
        const test = parse(`{
            getFoo @dissocPath(value: ["foo", "bar"]) {
                foo {
                    bar
                }
            }
        }`)

        const { dataTransformer } = clientDirectives({ dissocPath })(test)

        expect(dataTransformer({
            data: {
                getFoo: {
                    foo: {
                        bar: 10
                    }
                }
            }
        })).toEqual({
            data: {
                getFoo: {
                    foo: {}
                }
            }
        })
    })
})