import { parse } from 'graphql'
import { clientDirectives } from '@client-directives/core'
import { values } from '../src'

describe('values', () => {
    it('should return array of values', () => {
        const test = parse(`{
            getFoo @values {
                foo
                bar
                baz
            }
        }`)

        const { dataTransformer } = clientDirectives({ values })(test)

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
                getFoo: [1,2,3]
            }
        })
    })
})