import { parse } from 'graphql'
import { clientDirectives } from '@client-directives/core'
import { endsWith }from '../src'

describe('endsWith', () => {
    it('should return true if it ends with value', () => {
        const test = parse(`{
            getFoo {
                foo @endsWith(value: "c")
            }
        }`)

        const { dataTransformer } = clientDirectives({ endsWith })(test)

        expect(dataTransformer({
            data: {
                getFoo: {
                    foo: 'abc'
                }
            }
        })).toEqual({
            data: {
                getFoo: {
                    foo: true
                }
            }
        })
    })

    it('should return false if it does not end with value', () => {
        const test = parse(`{
            getFoo {
                foo @endsWith(value: "b")
            }
        }`)

        const { dataTransformer } = clientDirectives({ endsWith })(test)

        expect(dataTransformer({
            data: {
                getFoo: {
                    foo: 'abc'
                }
            }
        })).toEqual({
            data: {
                getFoo: {
                    foo: false
                }
            }
        })
    })
})