import { parse } from 'graphql'
import { clientDirectives } from '@client-directives/core'
import { uniq } from '../src'

describe('uniq', () => {
    it('should return array with only uniques', () => {
        const test = parse(`{
            getFoo {
                foo @uniq
            }
        }`)

        const { dataTransformer } = clientDirectives({ uniq })(test)

        expect(dataTransformer({
            data: {
                getFoo: {
                    foo: [1,1,2,1,3,3,4,5]
                }
            }
        })).toEqual({
            data: {
                getFoo: {
                    foo: [1,2,3,4,5]
                }
            }
        })
    })
})