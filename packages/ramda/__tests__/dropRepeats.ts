import { parse } from 'graphql'
import { clientDirectives } from '@client-directives/core'
import { dropRepeats }from '../src'

describe('dropRepeats', () => {
    it('should drop repeats', () => {
        const test = parse(`{
            getFoo {
                foo @dropRepeats
            }
        }`)

        const { dataTransformer } = clientDirectives({ dropRepeats })(test)

        expect(dataTransformer({
            data: {
                getFoo: {
                    foo: [1, 1, 2, 3, 4, 4, 1]
                }
            }
        })).toEqual({
            data: {
                getFoo: {
                    foo: [1, 2, 3, 4, 1]
                }
            }
        })
    })
})