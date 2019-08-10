import { parse } from 'graphql'
import { clientDirectives } from '@client-directives/core'
import { splitEvery } from '../src'

describe('splitEvery', () => {
    it('should split every 3', () => {
        const test = parse(`{
            getFoo {
                foo @splitEvery(value: 3)
            }
        }`)

        const { dataTransformer } = clientDirectives({ splitEvery })(test)

        expect(dataTransformer({
            data: {
                getFoo: {
                    foo: [1,2,3,4,5,6,7,8,9]
                }
            }
        })).toEqual({
            data: {
                getFoo: {
                    foo: [[1,2,3],[4,5,6],[7,8,9]]
                }
            }
        })
    })
})
