import { parse } from 'graphql'
import { clientDirectives } from '@client-directives/core'
import { startsWith } from '../src'

describe('startsWith', () => {
    it('should return true when it starts with the letter a', () => {
        const test = parse(`{
            getFoo {
                foo @startsWith(value: "a")
            }
        }`)

        const { dataTransformer } = clientDirectives({ startsWith })(test)

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
})