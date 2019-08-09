import { parse } from 'graphql'
import { clientDirectives } from '@client-directives/core'
import { join }from '../src'

describe('join', () => {
    it('should join the array with |', () => {
        const test = parse(`{
            getFoo {
                foo @join(value: "|")
            }
        }`)
        
        const { dataTransformer } = clientDirectives({ join })(test)

        expect(dataTransformer({
            data: {
                getFoo: {
                    foo: ['a', 'b', 'c']
                }
            }
        })).toEqual({
            data: {
                getFoo: {
                    foo: 'a|b|c'
                }
            }
        })
    })
})
