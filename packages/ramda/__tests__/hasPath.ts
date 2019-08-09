import { parse } from 'graphql'
import { clientDirectives } from '@client-directives/core'
import { hasPath }from '../src'

describe('hasPath', () => {
    it('should return true if it has value in path', () => {
        const test = parse(`{
            getFoo @hasPath(value: ["foo", "bar"]) {
                foo {
                    bar
                }
            }
        }`)

        const { dataTransformer } = clientDirectives({ hasPath })(test)

        expect(dataTransformer({
            data: {
                getFoo: {
                    foo: {
                        bar: 5
                    }
                }
            }
        })).toEqual({
            data: {
                getFoo: true
            }
        })
    })
})