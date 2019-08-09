import { parse } from 'graphql'
import { clientDirectives } from '@client-directives/core'
import { isEmpty }from '../src'

describe('isEmpty', () => {
    it('should return true for []' , () => {
        const test = parse(`{
            getFoo {
                foo @isEmpty
            }
        }`)

        const { dataTransformer } = clientDirectives({ isEmpty })(test)

        expect(dataTransformer({
            data: {
                getFoo: {
                    foo: []
                }
            }
        })).toEqual({
            data: {
                getFoo: {
                    foo: true
                }
            }
        })
    })
})
