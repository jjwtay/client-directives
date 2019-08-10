import { parse } from 'graphql'
import { clientDirectives } from '@client-directives/core'
import { without } from '../src'

describe('without', () => {
    it('should remove 1 & 2', () => {
        const test = parse(`{
            getFoo {
                foo @without(value: [1, 2])
            }
        }`)

        const { dataTransformer } = clientDirectives({ without })(test)

        expect(dataTransformer({
            data: {
                getFoo: {
                    foo: [1,1,2,3,1,2,4]
                }
            }
        })).toEqual({
            data: {
                getFoo: {
                    foo: [3, 4]
                }
            }
        })
    })
})