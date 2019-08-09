import { parse } from 'graphql'
import { clientDirectives } from '@client-directives/core'
import { drop }from '../src'

describe('drop', () => {
    it('should drop first n many elements from array', () => {
        const test = parse(`{
            getFoo {
                foo @drop(value: 2)
            }
        }`)

        const { dataTransformer } = clientDirectives({ drop })(test)

        expect(dataTransformer({
            data: {
                getFoo: {
                    foo: [1, 2, 3, 4, 5]
                }
            }
        })).toEqual({
            data: {
                getFoo: {
                    foo: [3, 4, 5]
                }
            }
        })
    })
})