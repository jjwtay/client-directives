import { parse } from 'graphql'
import { clientDirectives } from '@client-directives/core'
import { last }from '../src'

describe('last', () => {
    it('should pick last  element from array', () => {
        const test = parse(`{
            getFoo {
                foo @last
            }
        }`)

        const { dataTransformer } = clientDirectives({ last })(test)

        expect(dataTransformer({
            data: {
                getFoo: {
                    foo: ['fi', 'fo', 'fum']
                }
            }
        })).toEqual({
            data: {
                getFoo: {
                    foo: 'fum'
                }
            }
        })
    })
})

