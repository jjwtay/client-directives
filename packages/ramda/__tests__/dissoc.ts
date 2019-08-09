import { parse } from 'graphql'
import { clientDirectives } from '@client-directives/core'
import { dissoc }from '../src'

describe('dissoc', () => {
    it('should remove prop', () => {
        const test = parse(`{
            getFoo @dissoc(value: "foo") {
                foo 
            }
        }`)

        const { dataTransformer } = clientDirectives({ dissoc })(test)

        expect(dataTransformer({
            data: {
                getFoo: {
                    foo: 5
                }
            }
        })).toEqual({
            data: {
                getFoo: {}
            }
        })
    })
})