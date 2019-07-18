import { parse } from 'graphql/language'
import { dataTransform } from '../src/transform'
import * as R from 'ramda'

const directives = {
    add1: ({}) => R.add(1),
    toUpper: ({}) => R.toUpper,
    add: ({ value }) => R.add(value),
    convert: ({ from, to }: { from: string, to: string }) => (value: number): number =>  {

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

            const transformer = dataTransform(directives, test)
            
            expect(transformer({
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

            const transformer = dataTransform(directives, test)

            expect(transformer({
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

            const transformer = dataTransform(directives, test)

            expect(transformer({
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

            const transformer = dataTransform(directives, test)

            expect(transformer({
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

            const transformer = dataTransform(directives, test)

            expect(transformer({
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

            const transformer = dataTransform(directives, test)

            expect(transformer({
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

            const transformer = dataTransform(directives, test)

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

    })
})