import { parse } from 'graphql'
import { clientDirectives } from '@client-directives/core'
import { insert }from '../src'

describe('insert', () => {
    it('should insert "x" at position 2', () => {
        const test = parse(`{
            getFoo @insert(at: 2, value: "x") {
                foo
            }
        }`)

        const { dataTransformer } = clientDirectives({ insert })(test)

        expect(dataTransformer({
            data: {
                getFoo: [{
                    foo: 1
                }, {
                    foo: 2
                }, {
                    foo: 3
                }]
            }
        })).toEqual({
            data: {
                getFoo: [{
                    foo: 1
                }, {
                    foo: 2
                },
                'x',
                {
                    foo: 3
                }]
            }
        })
    })
})