import { parse } from 'graphql'
import { clientDirectives } from '@client-directives/core'
import { lt }from '../src'

describe('lt', () => {
    it('should return true for lt(3) when provided 5', () => {
        const test = parse(`{
            getFoo {
                foo @lt(value: 3)
            }
        }`)

        const { dataTransformer } = clientDirectives({ lt })(test)

        expect(dataTransformer({
            data: {
                getFoo: {
                    foo: 5
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