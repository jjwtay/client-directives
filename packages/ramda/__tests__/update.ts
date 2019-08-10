import { parse } from 'graphql'
import { clientDirectives } from '@client-directives/core'
import { update } from '../src'

describe('update', () => {
    it('shoud update at position 2', () => {
        const test = parse(`{
            getFoo {
                foo @update(at: 2, value: "updated")
            }
        }`)

        const { dataTransformer } = clientDirectives({ update })(test)

        expect(dataTransformer({
            data: {
                getFoo: {
                    foo: [1, 2, 3, 4]
                }
            }
        })).toEqual({
            data: {
                getFoo: {
                    foo: [1, 2, 'updated', 4]
                }
            }
        })
    })
})