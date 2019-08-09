import { parse } from 'graphql'
import { clientDirectives } from '@client-directives/core'
import { empty }from '../src'

describe('empty', () => {
    it('should empty an array', () => {
        const test = parse(`{
            getFoo {
                foo @empty
            }
        }`)

        const { dataTransformer } = clientDirectives({ empty })(test)

        expect(dataTransformer({
            data: {
                getFoo: {
                    foo: [1, 2, 3]
                }
            }
        })).toEqual({ 
            data: {
                getFoo: {
                    foo: []
                }
            }
        })
    })
})