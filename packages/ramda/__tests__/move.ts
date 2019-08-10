import { parse } from 'graphql'
import { clientDirectives } from '@client-directives/core'
import { move } from '../src'

describe('move', () => {
    it('should move an element in an array', () => {
        const test = parse(`{
            getFoo {
                foo @move(from: 3, to: 1)
            }
        }`)

        const { dataTransformer } = clientDirectives({ move })(test)

        expect(dataTransformer({
            data: {
                getFoo: {
                    foo: [1, 2, 3, 4, 5]
                }
            }
        })).toEqual({
            data: {
                getFoo: {
                    foo: [1, 4, 2, 3, 5]
                }
            }
        })
    })
})

