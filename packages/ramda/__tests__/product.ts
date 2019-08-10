import { parse } from 'graphql'
import { clientDirectives } from '@client-directives/core'
import { product } from '../src'

describe('product', () => {
    it('should multiple all entries in array', () => {
        const test = parse(`{
            getFoo {
                foo @product
            }
        }`)

        const { dataTransformer } = clientDirectives({ product })(test)

        expect(dataTransformer({
            data: {
                getFoo: {
                    foo: [1, 2, 3, 4, 5]
                }
            }
        })).toEqual({
            data: {
                getFoo: {
                    foo: 120
                }
            }
        })
    })
})