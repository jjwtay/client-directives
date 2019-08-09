import { parse } from 'graphql/language'
import { dataTransform, variablesTransform } from '../src/transform'
import { clientDirectives } from '../src'
import * as R from 'ramda'

const directives = {
    add1: ({}) => R.add(1),
    toUpper: ({}) => R.toUpper,
    add: ({ value }) => R.add(value),
    convert: ({ from, to }: { from: string, to: string }) => (value: number): number => {
        const fromMap = {
            FT: R.multiply(.3048),
            METERS: R.identity
        }

        const toMap = {
            METERS: R.identity,
            FT: R.multiply(3.28084)
        }

        const converter = R.pipe(
            fromMap[from],
            toMap[to]
        )
        // @ts-ignore
        return converter(value) //  eslint-ignore-line
    },
    divide: ({ value }) => R.divide(R.__, value),
    subtract: ({ value }) => R.subtract(R.__, value),
    prop: ({ prop }) => R.prop(prop),
    whereEq: (obj) => R.filter(R.whereEq(obj))
}

describe('./transform', () => {
    describe('transform', () => {
        it('should return a basic evolve object', () => {
            const test = parse(`{
                getFoo {
                    foo @add1
                    bar @toUpper
                    baz
                }
            }`)

            const { dataTransformer} = clientDirectives(directives)(test)
            
            expect(dataTransformer({
                data: {
                    getFoo: {
                        foo: 2,
                        bar: 'bar',
                        baz: 'baz'
                    }
                }
            })).toEqual({
                data: {
                    getFoo: {
                        foo: 3,
                        bar: 'BAR',
                        baz: 'baz'
                    }
                }
            })
        })

        it('should handle a basic name/value argument', () => {
            const test = parse(`{
                argTest @add(value: 2)
            }`)

            const { dataTransformer } = clientDirectives(directives)(test)

            expect(dataTransformer({
                data: {
                    argTest: 5
                }
            })).toEqual({
                data: {
                    argTest: 7
                }
            })
        })
        
        it('should handle multiple arguments', () => {
            const test = parse(`{
                multipleArgsTest @convert(from: "FT", to: "METERS")
            }`)

            const { dataTransformer } = clientDirectives(directives)(test)

            expect(dataTransformer({
                data:  {
                    multipleArgsTest: 3
                }
            }).data.multipleArgsTest).toBeCloseTo(0.9144)
        })

        it('should pipe directives', () => {
            const test = parse(`{
                pipeTest {
                    divSub @divide(value: 5) @subtract(value: 2)
                    subDiv @subtract(value: 2) @divide(value: 5)
                }
            }`)

            const { dataTransformer } = clientDirectives(directives)(test)

            expect(dataTransformer({
                data: { 
                    pipeTest: {
                        divSub: 3,
                        subDiv: 3
                    }
                }
            })).toEqual({
                data: { 
                    pipeTest: {
                        divSub: -1.4,
                        subDiv: 0.2
                    }
                }
            })
        })

        it('should transform objects', () => {
            const test = parse(`{
                objectTest @prop(prop: "name") {
                    name @toUpper
                    age
                }
            }`)

            const { dataTransformer } = clientDirectives(directives)(test)

            expect(dataTransformer({
                data: {
                    objectTest: {
                        name: 'joe smith',
                        age: 5
                    }
                }
            })).toEqual({
                data: {
                    objectTest: 'JOE SMITH'
                }
            })
        })

        it('should pipe objects', () => {
            const test = parse(`{
                objectTest @prop(prop: "name") @toUpper {
                    name
                    age
                }
            }`)

            const { dataTransformer } = clientDirectives(directives)(test)

            expect(dataTransformer({
                data: {
                    objectTest: {
                        name: 'joe smith',
                        age: 5
                    }
                }
            })).toEqual({
                data: {
                    objectTest: 'JOE SMITH'
                }
            })
        })

        it('should transform arrays', () => {
            const test = parse(`{
                arrayTest @whereEq(name: "JOE SMITH") {
                    name @toUpper
                    age
                }
            }`)

            const transformer = dataTransform(directives)(test)

            expect(transformer({
                data: {
                    arrayTest: [{
                        name: 'Jack Daniels',
                        age: 120
                    }, {
                        name: 'Joe Smith',
                        age: 50
                    }]
                }
            })).toEqual({
                data: {
                    arrayTest: [{
                        name: 'JOE SMITH',
                        age: 50
                    }]
                }
            })
        })
        it('should handle variables in query', () => {
            const test = parse(`
                query VariablesTest($from: String!, $to: String!, $value: Int!) {
                    variablesTest {
                        distance @convert(from: $from, to: $to)
                        foo @add(value: $value)
                    }
                }`)

            const variables = {
                from: 'FT',
                to: 'METERS',
                value: 5
            }
            const { dataTransformer } = clientDirectives(directives)(test, variables)

            expect(dataTransformer({
                data: {
                    variablesTest: {
                        distance: 10,
                        foo: 5
                    }
                }
            })).toEqual({
                data: {
                    variablesTest: {
                        distance: 3.048,
                        foo: 10
                    }
                }
            })
        })
        it('should handle input directives', () => {

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

            const variables = {
                from: 'METERS',
                to: 'FT',
                odometer: 10,
                speedometer: 65
            }

            const { variablesTransformer, dataTransformer } = clientDirectives(directives)(test, variables)
            expect(variablesTransformer(variables)).toEqual({
                odometer: 3.048,
                speedometer: 65
            })

            expect(dataTransformer({
                data: {
                    updateCar: {
                        odometer: 3.048,
                        speedometer: 65
                    }
                }
            }).data.updateCar.odometer).toBeCloseTo(10)
        })

        it('should handle aliasing', () => {
            const test = parse(`{
                getFoo {
                    blabla: foo @toUpper
                }
            }`)

            const { dataTransformer } = clientDirectives(directives)(test)

            expect(dataTransformer({
                data: {
                    getFoo: {
                        blabla: 'hello'
                    }
                }
            })).toEqual({
                data: {
                    getFoo: {
                        blabla: 'HELLO'
                    }
                }
            })
        })
    })
})