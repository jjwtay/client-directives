import { parse } from 'graphql'
import { clientDirectives } from '@client-directives/core'
import { mean }from '../src'

describe('mean', () => {
    it('should return 6 for [9, 7, 2]', () => {
        const test = parse(`{
            getFoo {
                foo @mean
            }
        }`)

        const { dataTransformer } = clientDirectives({ mean })(test)

        expect(dataTransformer({
            data: {
                getFoo: {
                    foo: [9, 7, 2]
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