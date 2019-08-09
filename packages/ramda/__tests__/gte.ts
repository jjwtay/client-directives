import { parse } from 'graphql'
import { clientDirectives } from '@client-directives/core'
import { gt }from '../src'

describe('gte', () => {
    it('should return true if data number  is less  than provided to gte', () => {
        const test = parse(`{
            getFoo {
                foo @gt(value: 5)
            }
        }`)

        const { dataTransformer } = clientDirectives({ gt })(test)

        expect(dataTransformer({
            data: {
                getFoo: {
                    foo: 4
                }
            }
        })).toEqual({
            data: {
                getFoo: {
                    foo: true
                }
            }
        })
    })
})