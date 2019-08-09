import { parse } from 'graphql'
import { clientDirectives } from '@client-directives/core'
import { assocPath }from '../src'

describe('assocPath', () => {
    it('should set value by path', () => {
        const test = parse(`{
            getFoo @assocPath(path: ["foo", "bar", "baz"], value: "banana") {
                foo {
                    bar {
                        baz
                    }
                }
            }
        }`)

        const { dataTransformer } = clientDirectives({ assocPath })(test)

        expect(dataTransformer({
            data: {
                getFoo: {
                    foo: {
                        bar: {
                            baz: 'apple'
                        }
                    }
                }
            }
        })).toEqual({
            data: {
                getFoo: {
                    foo: {
                        bar: {
                            baz: 'banana'
                        }
                    }
                }
            }
        })
    })
})