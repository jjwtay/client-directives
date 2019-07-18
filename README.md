# client-directives
GraphQL client directives for transforming data and inputs. NOTE: Is a work in process subject  to potential API changes.

### Motivation
Easily create client only graphql directives to automatically transform GraphQL responses and prepare GraphQL mutation Inputs(WIP). Heavily Inspired by [graphql-lodash](https://github.com/APIs-guru/graphql-lodash)

### Example Usage

```
import { parse } from 'graphql/language'
import { clientDirective } from 'client-directives/core'
import convert from 'client-directives/convert-units'

const exampleQuery = parse(`{
    getFoo {
        distance @convert(from: "FT", to: "M")
    }
}`)

const directives = {
    convert
}

const { graphql, transform } = convertDirective(directives, exampleQuery)

someGraphQLClientFetcher(graphql).then(data => transform(data))
```

### Example Create Client Directive

```
const toUpper = () => val => val.toUpperCase()

const add = ({ value }) => val => val + value

// to use now just pass to convertDirective

const exampleQuery = {
    getFoo {
        name @toUpper
        test @add(value: 3)
    }
}

const directives = {
    toUpper,
    add
}

const { query, transform } = convertDirective(directives, exampleQuery)

/* Now assuming used stripped query returns */
const pretendResult = {
    data: {
        getFoo: {
            name: 'Foo',
            test: 12
        }
    }
}

/* Then applying the transform: */
const transformed = transform(pretendResult)

/* yields
{
    data: {
        getFoo: {
            name: 'FOO',
            test: 15
        }
    }
}
*/

```

### TODO
- ~~Finish core API for directives applied to objects and lists.~~ (7/17/2019)
- Setup/test decorators args coming in as variables. (in progress)
- Finish core API for mutation Inputs.
- POC implementation of [convert-units](https://github.com/ben-ng/convert-units) directive.
- Create Apollo-client link to allow for auto applying transformations and investigate caching data and using cache to return transform(data) when only directive args have changed.
- Implement other libs as decorators.