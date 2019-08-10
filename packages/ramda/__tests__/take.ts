import { parse } from 'graphql'
import { clientDirectives } from '@client-directives/core'
import { take } from '../src'

describe('take', () => {
    it('should take first 2 elements', () => {
        const test = parse(`{
            getFoo {
                foo @take(value: 2)
            }
        }`)

        const { dataTransformer } = clientDirectives({ take })(test)

        expect(dataTransformer({
            data: {
                getFoo: {
                    foo: [1,2,3,4,5]
                }
            }
        })).toEqual({
            data: {
                getFoo: {
                    foo: [1,2]
                }
            }
        })
    })
})