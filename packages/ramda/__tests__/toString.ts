import { parse } from 'graphql'
import { clientDirectives } from '@client-directives/core'
import { toString } from '../src'

describe('toString', () => {
    it('should convert 1 to a string', () => {
        const test = parse(`{
            getFoo {
                foo @toString
            }
        }`)

        const { dataTransformer } = clientDirectives({ toString })(test)

        expect(dataTransformer({
            data: {
                getFoo: {
                    foo: 1
                }
            }
        })).toEqual({
            data: {
                getFoo: {
                    foo: '1'
                }
            }
        })
    })
})