import { parse } from 'graphql'
import { clientDirectives } from '@client-directives/core'
import { insertAll }from '../src'

describe('insertAll', () => {
    it('should insert all at position 2', () => {
        const test = parse(`{
            getFoo {
                foo @insertAll(at: 2, value: [1, 2, 3])
            }
        }`)

        const { dataTransformer } = clientDirectives({ insertAll })(test)

        expect(dataTransformer({
            data: {
                getFoo: {
                    foo: ['a', 'b', 'c', 'd']
                }
            }
        })).toEqual({
            data: {
                getFoo: {
                    foo: ['a', 'b', 1, 2, 3, 'c', 'd']
                }
            }
        })
    })
})