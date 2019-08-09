import { parse } from 'graphql'
import { clientDirectives } from '@client-directives/core'
import { head }from '../src'

describe('head', () => {
    it('should return first entry', () => {
        const test = parse(`{
            getFoo @head {
                foo
            }
        }`)

        const { dataTransformer } = clientDirectives({ head })(test)

        expect(dataTransformer({
            data: {
                getFoo: [{
                    foo: 5
                }, {
                    foo: 6
                }]
            }
        })).toEqual({
            data: {
                getFoo: {
                    foo: 5
                }
            }
        })
    })
})