import { parse } from 'graphql'
import { clientDirectives } from '@client-directives/core'
import { pathOr } from '../src'

describe('pathOr', () => {
    it('should use default value if does not exist', () => {
        const test = parse(`{
            getFoo @pathOr(path: ["foo", "bar"], value: 5) {
                foo {
                    bar
                }
            }
        }`)

        const { dataTransformer } = clientDirectives({ pathOr })(test)

        expect(dataTransformer({
            data: {
                getFoo: {
                    foo: {}
                }
            }
        })).toEqual({
            data: {
                getFoo: 5
            }
        })
    })
})