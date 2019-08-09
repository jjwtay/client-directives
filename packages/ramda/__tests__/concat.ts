import { parse } from 'graphql'
import { clientDirectives } from '@client-directives/core'
import { concat }from '../src'

describe('concat', () => {
    it('should add an array to an array', () => {
        const test = parse(`{
            getFoo {
                foo @concat(value: [4])
            }
        }`)

        const { dataTransformer } = clientDirectives({ concat })(test)

        expect(dataTransformer({
            data: {
                getFoo: {
                    foo: [1, 2, 3]
                }
            }
        })).toEqual({
            data: {
                getFoo: {
                    foo: [1, 2, 3, 4]
                }
            }
        })
    })
})
