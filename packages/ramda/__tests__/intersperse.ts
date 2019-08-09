import { parse } from 'graphql'
import { clientDirectives } from '@client-directives/core'
import { intersperse }from '../src'

describe('intersperce', () => {
    it('should intersperce "a" in ["b", "n", "n", "s"', () => {
        const test = parse(`{
            getFoo {
                foo @intersperse(value: "a")
            }
        }`)

        const { dataTransformer } = clientDirectives({ intersperse })(test)

        expect(dataTransformer({
            data: {
                getFoo: {
                    foo: ['b','n','n', 's']
                }
            }
        })).toEqual({
            data: {
                getFoo: {
                    foo: ['b', 'a', 'n', 'a', 'n', 'a', 's']
                }
            }
        })
    })
})