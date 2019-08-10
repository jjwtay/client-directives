import { parse } from 'graphql'
import { clientDirectives } from '@client-directives/core'
import { props } from '../src'

describe('props', () => {
    it('should put props i n array by order', () => {
        const test = parse(`{
            getFoo @props(value: ["bar", "foo", "baz"]) {
                foo
                bar
                baz
            }
        }`)

        const { dataTransformer } = clientDirectives({ props })(test)

        expect(dataTransformer({
            data: {
                getFoo: {
                    foo: 1,
                    bar: 2,
                    baz: 3
                }
            }
        })).toEqual({
            data: {
                getFoo: [2, 1, 3]
            }
        })
    })
})