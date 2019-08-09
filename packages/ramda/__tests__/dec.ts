import { parse } from 'graphql'
import { clientDirectives } from '@client-directives/core'
import { dec }from '../src'

describe('dec', () => {
    it('should decrement', () => {
        const test = parse(`{
            getFoo {
                foo @dec
            }
        }`)
        const { dataTransformer } = clientDirectives({ dec })(test)

        expect(dataTransformer({
            data: {
                getFoo: {
                    foo: 2
                }
            }
        })).toEqual({
            data: {
                getFoo: {
                    foo: 1
                }
            }
        })
    })
})