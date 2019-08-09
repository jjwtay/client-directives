import { parse } from 'graphql'
import { clientDirectives } from '@client-directives/core'
import { max }from '../src'

describe('max', () => {
    it('should return 5 for max(3) when provided 5',  () => {
        const test = parse(`{
            getFoo {
                foo @max(value: 3)
            }
        }`)

        const { dataTransformer } = clientDirectives({ max })(test)

        expect(dataTransformer({
            data: {
                getFoo: {
                    foo: 5
                }
            }
        })).toEqual({
            data: {
                getFoo: {
                    foo: 5
                }
            }
        })
    })

    it('should return 3 for max(3) when provided 2', () => {
        const test = parse(`{
            getFoo {
                foo @max(value: 3)
            }
        }`)        

        const { dataTransformer } = clientDirectives({ max })(test)

        expect(dataTransformer({
            data: {
                getFoo: {
                    foo: 2
                }
            }
        })).toEqual({
            data: {
                getFoo: {
                    foo: 3
                }
            }
        })
    })
})