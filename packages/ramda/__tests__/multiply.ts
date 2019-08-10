import { parse } from 'graphql'
import { clientDirectives } from '@client-directives/core'
import { multiply } from '../src'

describe('multiply', () => {
    it('it should multiply', () => {
        const test = parse(`{
            getFoo {
                foo @multiply(value: 3)
            }
        }`)

        const { dataTransformer } = clientDirectives({ multiply })(test)

        expect(dataTransformer({
            data: {
                getFoo: {
                    foo: 2
                }
            }
        })).toEqual({
            data: {
                getFoo: {
                    foo: 6
                }
            }
        })
    })
})