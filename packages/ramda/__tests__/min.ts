import { parse } from 'graphql'
import { clientDirectives } from '@client-directives/core'
import { min }from '../src'

describe('min', () => {
    it('should return the min', () => {
        const test = parse(`{
            getFoo {
                foo @min(value: 5)
            }
        }`)

        const { dataTransformer } = clientDirectives({ min })(test)

        expect(dataTransformer({
            data: {
                getFoo: {
                    foo: 6
                }
            }
        })).toEqual({
            data: {
                getFoo: {
                    foo: 5
                }
            }
        })
    })
})