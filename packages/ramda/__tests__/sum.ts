import { parse } from 'graphql'
import { clientDirectives } from '@client-directives/core'
import { sum } from '../src'

describe('sum', () => {
    it('should sum array', () => {
        const test = parse(`{
            getFoo {
                foo @sum
            }
        }`)

        const { dataTransformer } = clientDirectives({ sum })(test)

        expect(dataTransformer({
            data: {
                getFoo: {
                    foo: [1, 2, 3]
                }
            }
        })).toEqual({
            data: {
                getFoo: {
                    foo: 6
                }
            }
        })
    })
})
