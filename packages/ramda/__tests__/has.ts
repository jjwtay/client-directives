import { parse } from 'graphql'
import { clientDirectives } from '@client-directives/core'
import { has }from '../src'

describe('has', () => {
    it('should return true if it has supplied key', () => {
        const test = parse(`{
            getFoo @has(value: "foo") {
                foo
            }
        }`)

        const { dataTransformer } = clientDirectives({ has })(test)

        expect(dataTransformer({
            data: {
                getFoo: {
                    foo: 5
                }
            }
        })).toEqual({
            data: {
                getFoo: true
            }
        })
    })
})