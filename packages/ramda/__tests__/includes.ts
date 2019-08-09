import { parse } from 'graphql'
import { clientDirectives } from '@client-directives/core'
import { includes }from '../src'

describe('includes', () => {
    it('should return true if it includes the value', () => {
        const test = parse(`{
            getFoo @includes(value: { foo: "nine" }) {
                foo
            }
        }`)

        const { dataTransformer } = clientDirectives({ includes })(test)

        expect(dataTransformer({
            data: {
                getFoo: [{
                    foo: 'nine'
                }]
            }
        })).toEqual({
            data: {
                getFoo: true
            }
        })
    })
})