import { parse } from 'graphql'
import { clientDirectives } from '@client-directives/core'
import { pair } from '../src'

describe('pair', () => {
    it('should return an array of ["provided", "received"] ', () => {
        const test = parse(`{
            getFoo  {
                foo @pair(value: "provided")
            }
        }`)

        const { dataTransformer } = clientDirectives({ pair })(test)

        expect(dataTransformer({
            data: {
                getFoo: {
                    foo: 'received'
                }
            }
        })).toEqual({
            data: {
                getFoo: {
                    foo: ['provided', 'received']
                }
            }
        })
    })
})