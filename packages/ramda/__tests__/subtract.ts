import { parse } from 'graphql'
import { clientDirectives } from '@client-directives/core'
import { subtract } from '../src'

describe('subtract', () => {
    it('should subtract 2 from 6', () => {
        const test = parse(`{
            getFoo {
                foo @subtract(value: 2)
            }
        }`)

        const { dataTransformer } = clientDirectives({ subtract })(test)

        expect(dataTransformer({
            data: {
                getFoo: {
                    foo: 6
                }
            }
        })).toEqual({
            data: {
                getFoo: {
                    foo: 4
                }
            }
        })
    })
})
