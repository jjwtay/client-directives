import { parse } from 'graphql'
import { clientDirectives } from '@client-directives/core'
import { slice } from '../src'

describe('slice', () => {
    it('should slice', () => {
        const test = parse(`{
            getFoo {
                foo @slice(from: 1, to: 3)
            }
        }`)

        const { dataTransformer } = clientDirectives({ slice })(test)

        expect(dataTransformer({
            data: {
                getFoo: {
                    foo: [1, 2, 3, 4, 5, 6]
                }
            }
        })).toEqual({
            data: {
                getFoo: {
                    foo: [2, 3]
                }
            }
        })
    })
})