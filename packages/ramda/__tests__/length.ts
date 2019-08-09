import { parse } from 'graphql'
import { clientDirectives } from '@client-directives/core'
import { length}from '../src'

describe('length', () => {
    it('should return 3 for ["a", "b", "c"]', () => {
        const test = parse(`{
            getFoo {
                foo @length
            }
        }`)

        const { dataTransformer } = clientDirectives({ length })(test)
        
        expect(dataTransformer({
            data: {
                getFoo: {
                    foo: ['a', 'b', 'c']
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