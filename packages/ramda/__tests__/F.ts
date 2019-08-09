import { parse } from 'graphql'
import { clientDirectives } from '@client-directives/core'
import { F }from '../src'

describe('F', () => {
    it('should return false', () => {
        const test = parse(`{
            getFoo {
                foo @F
            }
        }`)

        const { dataTransformer } = clientDirectives({ F })(test)

        expect(dataTransformer({
            data: {
                getFoo: {
                    foo: 5
                }
            }
        })).toEqual({
            data: {
                getFoo: {
                    foo: false
                }
            }
        })
    })
})