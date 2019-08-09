import { parse } from 'graphql'
import { clientDirectives } from '@client-directives/core'
import { indexBy }from '../src'
import { forOfStatement } from '@babel/types';

describe('indexBy', () => {
    it('should index by key id', () => {
        const test = parse(`{
            getUsers @indexBy(value: "id") {
                id
                name
            }
        }`)

        const { dataTransformer } = clientDirectives({ indexBy })(test)

        expect(dataTransformer({
            data: {
                getUsers: [{
                    id: 1,
                    name: 'foo'
                }, {
                    id: 2,
                    name: 'bar'
                }]
            }
        })).toEqual({
            data: {
                getUsers: {
                    1: {
                        id: 1,
                        name: 'foo'
                    },
                    2: {
                        id: 2,
                        name: 'bar'
                    }
                }
            }
        })
    })

    it('should index by path ["address", "street"]', () => {
        const test = parse(`{
            getUsers @indexBy(value: ["address", "street"]) {
                name
                address {
                    street
                    zip
                }
            }
        }`)

        const { dataTransformer } = clientDirectives({ indexBy })(test)

        expect(dataTransformer({
            data: {
                getUsers: [{
                    name: 'foo',
                    address: {
                        street: 'fooWay',
                        zip: 11
                    }
                }, {
                    name: 'bar',
                    address: {
                        street: 'barWay',
                        zip: 22
                    }
                }]
            }
        })).toEqual({
            data: {
                getUsers: {
                    fooWay: {
                        name: 'foo',
                        address: {
                            street: 'fooWay',
                            zip: 11
                        }
                    },
                    barWay: {
                        name: 'bar',
                        address: {
                            street: 'barWay',
                            zip: 22
                        }
                    }
                }
            }
        })
    })
})