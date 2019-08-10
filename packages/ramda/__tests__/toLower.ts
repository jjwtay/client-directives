import { parse } from 'graphql'
import { clientDirectives } from '@client-directives/core'
import { toLower } from '../src'

describe('toLower', () => {
    it('should lowercase', () => {
        const test = parse(`{
            getFoo {
                foo @toLower
            }
        }`)

        const { dataTransformer } = clientDirectives({ toLower })(test)

        expect(dataTransformer({
            data: {
                getFoo: {
                    foo: 'hElLo WOrLd'
                }
            }
        })).toEqual({
            data: {
                getFoo: {
                    foo: 'hello world'
                }
            }
        })
    })
})