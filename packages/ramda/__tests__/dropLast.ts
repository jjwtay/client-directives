import { parse } from 'graphql'
import { clientDirectives } from '@client-directives/core'
import { dropLast }from '../src'

describe('dropLast', () => {
    it('should drop last n many from array', () => {
        const test = parse(`{
            getFoo {
                foo @dropLast(value: 2)
            }
        }`)

        const { dataTransformer } = clientDirectives({ dropLast })(test)

        expect(dataTransformer({
            data: {
                getFoo: {
                    foo: [1, 2, 3, 4, 5]
                }
            }
        })).toEqual({
            data: {
                getFoo: {
                    foo: [1, 2, 3]
                }
            }
        })
    })
})