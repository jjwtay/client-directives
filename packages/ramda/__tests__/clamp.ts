import { parse } from 'graphql'
import { clientDirectives } from '@client-directives/core'
import { clamp }from '../src'

describe('clamp', () => {
    it('should clamp', () => {
        const test = parse(`{
            getFoo {
                foo @clamp(value: [1, 10])
            }
        }`)

        const { dataTransformer } = clientDirectives({ clamp })(test)

        expect(dataTransformer({
            data: {
                getFoo: {
                    foo: 1
                }
            }
        })).toEqual({
            data: {
                getFoo: {
                    foo: 1
                }
            }
        })

        expect(dataTransformer({
            data:  {
                getFoo: {
                    foo: 0
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