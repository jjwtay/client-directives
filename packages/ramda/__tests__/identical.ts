import { parse } from 'graphql'
import { clientDirectives } from '@client-directives/core'
import { identical }from '../src'

describe('identical', () => {
    it('should return true for 1 and 1', () => {
        const test = parse(`{
            getFoo {
                foo @identical(value: 1)
            }
        }`)

        const  { dataTransformer } = clientDirectives({ identical })(test)

        expect(dataTransformer({
            data: {
                getFoo: {
                    foo: 1
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