import { parse } from 'graphql'
import { clientDirectives } from '@client-directives/core'
import { equals }from '../src'

describe('equals', () => {
    it('should return true when they are equal', () => {
        const test = parse(`{
            getFoo @equals(value: { foo: 5 }) {
                foo
            }
        }`)

        const { dataTransformer } = clientDirectives({ equals })(test)

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