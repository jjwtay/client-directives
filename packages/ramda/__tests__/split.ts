import { parse } from 'graphql'
import { clientDirectives } from '@client-directives/core'
import { split } from '../src'

describe('split', () => {
    it('should split on / ', () => {
        const test = parse(`{
            getFoo {
                foo @split(value: "/")
            }
        }`)

        const { dataTransformer  } = clientDirectives({ split })(test)

        expect(dataTransformer({
            data: {
                getFoo: {
                    foo: "split/me/now"
                }
            }
        })).toEqual({
            data: {
                getFoo: {
                    foo: ["split", "me", "now"]
                }
            }
        })
    })
})