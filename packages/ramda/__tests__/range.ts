import { parse } from 'graphql'
import { clientDirectives } from '@client-directives/core'
import { range } from '../src'

describe('range', () => {
    it('should create a range from 2 -> 4', () => {
        const test = parse(`{
            getFoo {
                foo @range(value: 2)
            }
        }`)

        const { dataTransformer } = clientDirectives({ range })(test)

        expect(dataTransformer({
            data: {
                getFoo: {
                    foo: 5
                }
            }
        })).toEqual({
            data: {
                getFoo: {
                    foo: [2, 3, 4]
                }
            }
        })
    })
})