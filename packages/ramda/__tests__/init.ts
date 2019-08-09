import { parse } from 'graphql'
import { clientDirectives } from '@client-directives/core'
import { init }from '../src'

describe('init', () => {
    it('should grab all but last from array', () => {
        const test = parse(`{
            getFoo {
                foo @init
            }
        }`)

        const { dataTransformer } = clientDirectives({ init })(test)

        expect(dataTransformer({
            data: {
                getFoo: {
                    foo: [1, 2, 3, 4, 5]
                }
            }
        })).toEqual({
            data: {
                getFoo: {
                    foo: [1, 2, 3, 4]
                }
            }
        })
    })
})