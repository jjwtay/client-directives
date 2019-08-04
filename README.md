# client-directives
GraphQL client directives for transforming data and inputs. NOTE: Is a work in process subject  to potential API changes.

### Motivation
Easily create client only graphql directives to automatically transform GraphQL responses and prepare GraphQL mutation Inputs(WIP). Heavily Inspired by [graphql-lodash](https://github.com/APIs-guru/graphql-lodash)

### Installation
```
    npm install @client-directives/core
```

### API
```
type clientDirectives = (directives: Record<string, Function>) =>
    (astNode: DocumentNode, variables: Object) =>
        {
            query: DocumentNode,
            dataTransform: Function,
            variablesTransform: Function
        }
```
<li>
astNode = Parsed GraphQL string. (can be from graphql-js parse function or graphql-tag gql`` or w/e preferred).
</li>

### Usage (note create directive examples inside packages/core/__tests__/transform.ts)
Given "client-directives" @convert and the  following mutation (or query)
```
    const test = `
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
    `
```
with these variables:
```
    const variables = {
        from: 'METERS',
        to: 'FT',
        odometer: 10,
        speedometer: 65
    }
```
Then we can strip the query, transform the variables to be used for executing query/mutation as follows:
```
    const { query, dataTransform, variablesTransform } = clientDirectives(directives)(parse(test), variables)

    fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            query: print(query)
            variables: variablesTransform(variables)
        })
    })
    .then(data => data.json())
    .then(data => console.log(dataTransform(data))

```

Will console.log the following:
```
{
    data: {
        updateCar: {
            odometer: 3.048,
            speedometer: 65
        }
    }
}
```

Note: In this example the server only accepts an odometer value in meters. Our client however provides the value in feet so we transform the input value
into METERS via the built in @VariablesTransform directive. The actual variables provided get transformed by applying variablesTransform returned function.
The query returned has stripped out variables and directives the server cannot handle. Finally returned result gets transformed back into what the client understands
(feet) via returned dataTransform function.

### TODO
- ~~Finish core API for directives applied to objects and lists.~~ (7/17/2019)
- ~~Setup/test decorators args coming in as variables.~~ (7/17/2019)
- ~~Finish core API for mutation Inputs.~~ (8/4/2019)
- Publish alph to npm.
- POC implementation of [convert-units](https://github.com/ben-ng/convert-units) directive.
- Handle aliasing.
- Create Apollo-client link to allow for auto applying transformations and investigate caching data and using cache to return transform(data) when only directive args have changed.
- Implement other libs as decorators.