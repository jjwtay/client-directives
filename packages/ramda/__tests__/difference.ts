import { parse } from 'graphql'
import { clientDirectives } from '@client-directives/core'
import { difference }from '../src'

describe('difference', () => {
    it('should find the difference', () => {
        const test = parse(`{
            getFoo {
                foo @difference(value: [1, 2, 3])
            }
        }`)

        const { dataTransformer } = clientDirectives({ difference })(test)

        expect(dataTransformer({
            data: {
                getFoo: {
                    foo: [2, 5, 7, 8]
                }
            }
        })).toEqual({
            data: {
                getFoo: {
                    foo: [1, 3]
                }
            }
        })
    })
})