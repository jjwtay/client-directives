import { strip } from '../src/strip'
import { parse, print } from 'graphql/language'
import { dataTransform } from '../src/transform'
import * as R from 'ramda'


describe('strip.ts', () => {
    describe('strip', () => {
        it('should correctly strip directives passed in', () => {

            const directives = {
                foo: {},
                bar: {},
                bleh: {}
            }

            const test = `{
                getFoo @foo {
                    bar @bar
                    baz {
                        bleh @bleh
                    }
                }
            }`
            
            const expectedResult = `{
                getFoo {
                    bar
                    baz {
                        bleh
                    }
                }
            }`

            const result = print(strip(directives, parse(test))).replace(/\s+/g, '')

            expect(result).toEqual(expectedResult.replace(/\s+/g, ''))
        })

        it('should not remove non client directives', () => {
            const test = `{
                getFoo @foo {
                    bar @bar
                }
            }`

            const expectedResult = `{
                getFoo {
                    bar @bar
                }
            }`.replace(/\s+/g, '')

            const result = print(strip({ foo: {} }, parse(test))).replace(/\s+/g, '')

            expect(result).toEqual(expectedResult)
        })
    })
})