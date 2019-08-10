import { parse } from 'graphql'
import { clientDirectives } from '@client-directives/core'
import { reverse } from '../src'

describe('reverse', () => {
    it('should reverse [1,2,3,4,5]', () => {
        const test = parse(`{
            getFoo {
                foo @reverse
            }
        }`)

        const { dataTransformer } = clientDirectives({ reverse })(test)

        expect(dataTransformer({
            data: {
                getFoo: {
                    foo: [1,2,3,4,5]
                }
            }
        })).toEqual({
            data: {
                getFoo: {
                    foo: [5,4,3,2,1]
                }
            }
        })
    })
})