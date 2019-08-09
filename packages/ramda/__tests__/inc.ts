import { parse } from 'graphql'
import { clientDirectives } from '@client-directives/core'
import { inc }from '../src'

describe('inc', () => {
    it('should increment', () => {
        const test = parse(`{
            getFoo {
                foo @inc
            }
        }`)

        const  { dataTransformer } = clientDirectives({ inc })(test)

        expect(dataTransformer({
            data: {
                getFoo: {
                    foo: 7
                }
            }
        })).toEqual({
            data: {
                getFoo: {
                    foo: 8
                }
            }
        })
    })
})