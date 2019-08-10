import { parse } from 'graphql'
import { clientDirectives } from '@client-directives/core'
import { project } from '../src'

describe('project', () => {
    it('should select those fields from each entry', () => {
        const test = parse(`{
            getFoo {
                foo @project(value: ["name", "age"]) {
                    name
                    id
                    age
                }
            }
        }`)

        const { dataTransformer } = clientDirectives({ project })(test)

        expect(dataTransformer({
            data: {
                getFoo: {
                    foo: [{
                        name: "Joe Smith",
                        id: 1,
                        age: 24
                    }, {
                        name: "John Doe",
                        id: 2,
                        age: 54
                    }]
                }
            }
        })).toEqual({
            data: {
                getFoo: {
                    foo: [{
                        name: "Joe Smith",
                        age: 24
                    }, {
                        name: "John Doe",
                        age: 54
                    }]
                }
            }
        })
    })
})