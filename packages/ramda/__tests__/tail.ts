import { parse } from 'graphql'
import { clientDirectives } from '@client-directives/core'
import { tail } from '../src'

describe('tail', () => {
    it('should return [2,3,4,5]', () => {
        const test = parse(`{
            getFoo {
                foo @tail
            }
        }`)

        const { dataTransformer } = clientDirectives({ tail })(test)

        expect(dataTransformer({
            data: {
                getFoo: {
                    foo: [1,2,3,4,5]
                }
            }
        })).toEqual({
            data: {
                getFoo: {
                    foo: [2,3,4,5]
                }
            }
        })
    })
})