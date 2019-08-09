import { parse } from 'graphql'
import { clientDirectives } from '@client-directives/core'
import { lastIndexOf }from '../src'

describe('lastIndexOf', () => {
    it('should return the last index of 1 (4)', () => {
        const test = parse(`{
            getFoo {
                foo @lastIndexOf(value: 1)
            }
        }`)

        const { dataTransformer } = clientDirectives({ lastIndexOf })(test)

        expect(dataTransformer({
            data: {
                getFoo: {
                    foo: [1, 1, 2, 3, 1, 4]
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