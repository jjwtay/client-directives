import { parse } from 'graphql'
import { clientDirectives } from '@client-directives/core'
import { nth } from '../src'

describe('nth', () => {
    it('should grab the 3rd entry from the array', () => {
        const test = parse(`{
            getFoo {
                foo @nth(value: 3)
            }
        }`)

        const { dataTransformer } = clientDirectives({ nth })(test)

        expect(dataTransformer({
            data: {
                getFoo: {
                    foo: [1, 2, 3, 4, 5]
                }
            }
        })).toEqual({
            data: {
                getFoo: {
                    foo: 4
                }
            }
        })
    })
})