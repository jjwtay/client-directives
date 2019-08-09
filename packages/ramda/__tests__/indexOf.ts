import { parse } from 'graphql'
import { clientDirectives } from '@client-directives/core'
import { indexOf }from '../src'

describe('indexOf', () => {
    it('should return the index of the element', () => {
        const test = parse(`{
            getFoo @indexOf(value: { name: "bar" }) {
                name
            }
        }`)

        const { dataTransformer } = clientDirectives({ indexOf })(test)

        expect(dataTransformer({
            data: {
                getFoo: [{
                    name: 'foo'
                }, {
                    name: 'bar'
                }]
            }
        })).toEqual({
            data: {
                getFoo: 1
            }
        })
    })
})