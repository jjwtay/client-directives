import { clientDirectives } from '../src'
import { parse, print } from 'graphql/language'
import * as  R from 'ramda'

describe('strip.ts', () => {
    describe('strip', () => {
        it('should correctly strip directives passed in', () => {

            const directives = {
                foo: () => R.identity,
                bar: () => R.identity,
                bleh: () => R.identity
            }

            const test = parse(`{
                getFoo @foo {
                    bar @bar
                    baz {
                        bleh @bleh
                    }
                }
            }`)
            
            const expectedResult = `{
                getFoo {
                    bar
                    baz {
                        bleh
                    }
                }
            }`
            const { query } = clientDirectives(directives)(test)
            const result = print(query).replace(/\s+/g, '')

            expect(result).toEqual(expectedResult.replace(/\s+/g, ''))
        })

        it('should not remove non client directives', () => {
            const test = parse(`{
                getFoo @foo {
                    bar @bar
                }
            }`)

            const expectedResult = `{
                getFoo {
                    bar @bar
                }
            }`.replace(/\s+/g, '')

            const { query } = clientDirectives({ foo: () => R.identity })(test)
            const result = print(query).replace(/\s+/g, '')

            expect(result).toEqual(expectedResult)
        })

        it('should strip unused variables', () => {
            const test = parse(`
            mutation UpdateCar(
                $odometer: Float!,
                $speedometer: Float!,
                $from: String!,
                $to: String!
            ) @VariablesTransform(
                odometer: [ "convert", { from: $to, to: $from } ]
            ) {
                updateCar(
                    odometer: $odometer,
                    speedometer: $speedometer
                ) {
                    odometer @convert(from: $from, to: $to)
                    speedometer
                }
            }
            `)

            const expectedResult = `
            mutation UpdateCar(
                $odometer: Float!,
                $speedometer: Float!
            ) {
                updateCar(
                    odometer: $odometer,
                    speedometer: $speedometer
                ) {
                    odometer
                    speedometer
                }
            }
            `.replace(/\s+/g, '')

            const { query } = clientDirectives({ convert: () => R.identity})(test)
            const stripped = print(query)
            const result = stripped.replace(/\s+/g, '')

            expect(result).toEqual(expectedResult)
        })
    })
})