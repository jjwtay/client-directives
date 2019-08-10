import { parse } from 'graphql'
import { clientDirectives } from '@client-directives/core'
import { toUpper } from '../src'

describe('toUpper', () => {
    it('should uppercase', () => {
        const test = parse(`{
            getFoo {
                foo @toUpper
            }
        }`)

        const  { dataTransformer } = clientDirectives({ toUpper })(test)

        expect(dataTransformer({
            data: {
                getFoo: {
                    foo: 'hello world'
                }
            }
        })).toEqual({
            data: {
                getFoo: {
                    foo: 'HELLO WORLD'
                }
            }
        })
    })
})