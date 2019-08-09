import { parse } from 'graphql'
import { clientDirectives } from '@client-directives/core'
import { contains }from '../src'

describe('contains', () => {
    it('should return true when it contains', () => {
        const test = parse(`{
            getFoo {
                foo @contains(value: 3)
            }
        }`)

        const { dataTransformer } = clientDirectives({ contains })(test)

        expect(dataTransformer({
            data: {
                getFoo: {
                    foo: [1, 2, 3]
                }
            }
        })).toEqual({
            data: {
                getFoo: {
                    foo: true
                }
            }
        })
    })

    it('should return false  when it does not contain', () => {
        const test = parse(`{
            getFoo {
                foo @contains(value: 4)
            }
        }`)

        const { dataTransformer } = clientDirectives({ contains })(test)

        expect(dataTransformer({
            data: {
                getFoo: {
                    foo: [1, 2, 3]
                }
            }
        })).toEqual({
            data: {
                getFoo: {
                    foo: false
                }
            }
        })
    })
})