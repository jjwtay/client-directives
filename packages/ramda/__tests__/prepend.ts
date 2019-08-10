import { parse } from 'graphql'
import { clientDirectives } from '@client-directives/core'
import { prepend } from '../src'

describe('prepend', () => {
    it('should prepend foo', () => {
        const test = parse(`{
            getFoo {
                foo @prepend(value: "foo")
            }
        }`)

        const { dataTransformer } = clientDirectives({ prepend })(test)

        expect(dataTransformer({
            data: {
                getFoo: {
                    foo: ["fi", "fum"]
                }
            }
        })).toEqual({
            data: {
                getFoo: {
                    foo: ["foo", "fi", "fum"]
                }
            }
        })
    })
})