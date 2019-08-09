import { parse } from 'graphql'
import { clientDirectives } from '@client-directives/core'
import { mathMod }from '../src'

describe('mathMod', () => {
    it('should return 2 for mod = 5 value = 17', () => {
        const test = parse(`{
            getFoo {
                foo @mathMod(value: 5)
            }
        }`)

        const { dataTransformer } = clientDirectives({ mathMod })(test)
        expect(dataTransformer({
            data: {
                getFoo: {
                    foo: 17
                }
            }
        })).toEqual({
            data: {
                getFoo: {
                    foo: 2
                }
            }
        })
    })
})