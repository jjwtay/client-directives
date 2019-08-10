import { parse } from 'graphql'
import { clientDirectives } from '@client-directives/core'
import { trim } from '../src'

describe('trim', () => {
    it('should trim empty space', () => {
        const test = parse(`{
            getFoo {
                foo @trim
            }
        }`)

        const { dataTransformer } = clientDirectives({ trim })(test)

        expect(dataTransformer({
            data: {
                getFoo: {
                    foo: '   hello    '
                }
            }
        })).toEqual({
            data: {
                getFoo: {
                    foo: 'hello'
                }
            }
        })
    })
})