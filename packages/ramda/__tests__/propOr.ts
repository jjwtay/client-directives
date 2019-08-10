import { parse } from 'graphql'
import { clientDirectives } from '@client-directives/core'
import { propOr } from '../src'

describe('propOr', () => {
    it('should default to 23', () => {
        const test = parse(`{
            getFoo @propOr(value: "foo", or: 23) {
                foo
                bar
            }
        }`)

        const { dataTransformer } = clientDirectives({ propOr })(test)

        expect(dataTransformer({
            data: {
                getFoo: {
                    bar: 10
                }
            }
        })).toEqual({
            data: {
                getFoo: 23
            }
        })
    })
})