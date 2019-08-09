import { parse } from 'graphql'
import { clientDirectives } from '@client-directives/core'
import { assoc }from '../src'

describe('assoc', () => {
    it('should set a property', () => {
        const test = parse(`{
            getFoo @assoc(key: "foo", value: "bye bye") {
                foo
            }
        }`)

        const { dataTransformer } = clientDirectives({ assoc })(test)

        expect(dataTransformer({
            data: {
                getFoo: {
                    foo: 'hello'
                }
            }
        })).toEqual({
            data: {
                getFoo: {
                    foo: 'bye bye'
                }
            }
        })
    })

    it('should set property if property does not exist', () => {
        const test = parse(`{
            getFoo @assoc(key: "foo", value: "hello world") {
                foo
            }
        }`)

        const { dataTransformer } = clientDirectives({ assoc })(test)

        expect(dataTransformer({
            data: {
                getFoo: {}
            }
        })).toEqual({ 
            data: {
                getFoo: {
                    foo: 'hello world'
                }
            }
        })
    })
})