import { parse } from 'graphql'
import { clientDirectives } from '@client-directives/core'
import { divide }from '../src'

describe('divide', () => {
    it('should divide by number provided', () => {
        const test = parse(`{
            getFoo {
                foo @divide(value: 2)
            }
        }`)

        const { dataTransformer } = clientDirectives({ divide })(test)

        expect(dataTransformer({
            data: {
                getFoo: {
                    foo: 4
                }
            }
        })).toEqual({
            data: {
                getFoo: {
                    foo: 2
                }
            }
        })
    })
})