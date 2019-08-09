import { parse } from 'graphql'
import { clientDirectives } from '@client-directives/core'
import { median }from '../src'

describe('median', () => {
    it('should return 7 for [9, 7, 2]', () => {
        const test = parse(`{
            getFoo {
                foo @median
            }
        }`)

        const { dataTransformer } = clientDirectives({ median })(test)

        expect(dataTransformer({
            data: {
                getFoo: {
                    foo: [9, 7, 2]
                }
            }
        })).toEqual({
            data: {
                getFoo: {
                    foo: 7
                }
            }
        })
    })
})