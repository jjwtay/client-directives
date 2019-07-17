import { parse } from 'graphql/language'
import { dataTransform } from '../src/transform'
import * as R from 'ramda'

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

            const directives = {
                add1: ({}) => R.add(1),
                toUpper: ({}) => R.toUpper
            }

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

            const directives = {
                add: ({ value }) => R.add(value)
            }

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

            const directives = {
                convert: ({ from, to }: { from: string, to: string }) => (value: number): number =>  {
                    console.log(from, to)
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
                }
            }

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

            const directives = {
                divide: ({ value }) => R.divide(R.__, value),
                subtract: ({ value }) => R.subtract(R.__, value)
            }

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
    })
})