import { parse } from 'graphql'
import { clientDirectives } from '@client-directives/core'
import { lte }from '../src'

describe('lte', () => {
    it('should return true for lt(3) when provided 3', () => {
        const test = parse(`{
            getFoo {
                foo @lte(value: 3)
            }
        }`)

        const { dataTransformer } = clientDirectives({ lte })(test)

        expect(dataTransformer({
            data: {
                getFoo: {
                    foo: 3
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