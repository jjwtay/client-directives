import { parse } from 'graphql'
import { clientDirectives } from '@client-directives/core'
import { intersection }from '../src'

describe('intersection', () => {
    it('should find the intersection', () => {
        const test = parse(`{
            getFoo {
                foo @intersection(value: [1, 3, 5])
            }
        }`)

        const { dataTransformer } = clientDirectives({ intersection })(test)

        expect(dataTransformer({
            data: {
                getFoo: {
                    foo: [2,3,4,5,7,9]
                }
            }
        })).toEqual({
            data: {
                getFoo: {
                    foo: [3, 5]
                }
            }
        })
    })
})