import { parse } from 'graphql'
import { clientDirectives } from '@client-directives/core'
import { prop } from '../src'

describe('prop', () => {
    it('should select prop foo', () => {
        const test = parse(`{
            getFoo @prop(value: "foo") {
                foo
                bar
            }
        }`)

        const { dataTransformer } = clientDirectives({ prop })(test)

        expect(dataTransformer({
            data: {
                getFoo: {
                    foo: 1,
                    bar: 2
                }
            }
        })).toEqual({
            data: {
                getFoo: 1
            }
        })
    })
})