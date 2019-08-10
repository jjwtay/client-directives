import { parse } from 'graphql'
import { clientDirectives } from '@client-directives/core'
import { splitAt } from '../src'

describe('splitAt', () => {
    it('should split at 2', () => {
        const test = parse(`{
            getFoo {
                foo @splitAt(value: 2)
            }
        }`)

        const { dataTransformer } = clientDirectives({ splitAt })(test)

        expect(dataTransformer({
            data: {
                getFoo: {
                    foo: [1, 2, 3, 4, 5]
                }
            }
        })).toEqual({
            data: {
                getFoo: {
                    foo: [[1, 2], [3, 4, 5]]
                }
            }
        })
    })
})
