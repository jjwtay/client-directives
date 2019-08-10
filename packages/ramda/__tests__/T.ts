import { parse } from 'graphql'
import { clientDirectives } from '@client-directives/core'
import { T } from '../src'

describe('T', () => {
    it('should alywas return true', () => {
        const test = parse(`{
            getFoo {
                foo @T
            }
        }`)
    
        const { dataTransformer } = clientDirectives({ T })(test)

        expect(dataTransformer({
            data: {
                getFoo: {
                    foo: 5
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
})