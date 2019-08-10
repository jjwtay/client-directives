import { parse } from 'graphql'
import { clientDirectives } from '@client-directives/core'
import { remove } from '../src'

describe('remove', () => {
    it('should remove 3, 4, 5', () => {
        const test = parse(`{
            getFoo {
                foo @remove(start: 2, count: 3)
            }
        }`)

        const { dataTransformer } = clientDirectives({ remove })(test)

        expect(dataTransformer({
            data: {
                getFoo: {
                    foo: [1,2,3,4,5,6,7,8]
                }
            }
        })).toEqual({
            data: {
                getFoo: {
                    foo: [1,2,6,7,8]
                }
            }
        })
    })
})