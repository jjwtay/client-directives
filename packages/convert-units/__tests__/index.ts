import { parse } from 'graphql'
import { clientDirectives } from '@client-directives/core'
import convert from '../src'

describe('convert-units', () => {
    it('should convert units', () => {
        console.log(convert)
        const test = parse(`
            query {
                getCar {
                    speed @convert(from: "m/h", to: "km/h")
                }
            }
        `)

        const { query, dataTransformer } = clientDirectives({ convert })(test)

        expect(dataTransformer({
            data:  {
                getCar: {
                    speed: 10
                }
            }
        })).toEqual({
            data: {
                getCar:  {
                    speed: 16.09344
                }
            }
        })
    })
})