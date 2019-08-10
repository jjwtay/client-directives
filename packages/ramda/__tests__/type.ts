import { parse } from 'graphql'
import { clientDirectives } from '@client-directives/core'
import { type } from '../src'

describe('type', () => {
    it('should return Number for 1', () => {
        const test = parse(`{
            getFoo {
                foo @type
            }
        }`)

        const  { dataTransformer } = clientDirectives({ type })(test)

        expect(dataTransformer({
            data: {
                getFoo: {
                    foo: 1
                }
            }
        })).toEqual({
            data: {
                getFoo: {
                    foo: 'Number'
                }
            }
        })
    })
})