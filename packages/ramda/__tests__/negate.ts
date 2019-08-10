import { parse } from 'graphql'
import { clientDirectives } from '@client-directives/core'
import { negate } from '../src'

describe('negate', () => {
    it('should negate', () => {
        const test = parse(`{
            getFoo {
                foo @negate
            }
        }`)

        const { dataTransformer } = clientDirectives({ negate })(test)

        expect(dataTransformer({
            data: {
                getFoo: {
                    foo: 5
                }
            }
        })).toEqual({
            data: {
                getFoo: {
                    foo: -5
                }
            }
        })
    })
})