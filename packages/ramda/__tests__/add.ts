import { parse } from 'graphql'
import { clientDirectives } from '@client-directives/core'
import { add }from '../src'

describe('add',  () => {
    it('should add', () => {
        const test = parse(`{
            getFoo {
                foo @add(value: 3)
            }
        }`)

        const { dataTransformer } = clientDirectives({ add })(test)

        expect(dataTransformer({
            data: {
                getFoo: {
                    foo: 5
                }
            }
        })).toEqual({
            data: {
                getFoo:  {
                    foo: 8
                }
            }
        })
    })
})