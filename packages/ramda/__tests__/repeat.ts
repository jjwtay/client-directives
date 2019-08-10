import { parse } from 'graphql'
import { clientDirectives } from '@client-directives/core'
import { repeat } from '../src'

describe('repeat', () => {
    it('should repeat hello world 3 times', () => {
        const test = parse(`{
            getFoo {
                foo @repeat(value: "hello world")
            }
        }`)

        const { dataTransformer } = clientDirectives({ repeat })(test)

        expect(dataTransformer({
            data: {
                getFoo: {
                    foo: 3
                }
            }
        })).toEqual({
            data: {
                getFoo: {
                    foo: ["hello world", "hello world", "hello world"]
                }
            }
        })
    })
})