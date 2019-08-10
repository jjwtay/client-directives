import { parse } from 'graphql'
import { clientDirectives } from '@client-directives/core'
import { takeLast } from '../src'

describe('takeLast', () => {
    it('should take last 3', () => {
        const test = parse(`{
            getFoo {
                foo @takeLast(value: 3)
            }
        }`)

        const { dataTransformer } = clientDirectives({ takeLast })(test)

        expect(dataTransformer({
            data: {
                getFoo: {
                    foo: [1,2,3,4,5]
                }
            }
        })).toEqual({
            data: {
                getFoo: {
                    foo: [3,4,5]
                }
            }
        })
    })
})