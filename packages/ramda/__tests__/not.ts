import { parse } from 'graphql'
import { clientDirectives } from '@client-directives/core'
import { not } from '../src'

describe('not', () => {
    it('should convert true to false', () => {
        const test = parse(`{
            getFoo {
                foo @not
            }
        }`)

        const { dataTransformer } = clientDirectives({ not })(test)

        expect(dataTransformer({
            data: {
                getFoo: {
                    foo: true
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