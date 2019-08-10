# @client-directives/ramda
Subset of Ramda for use in graphql.

### Peer Dependencies
```
    ramda
    graphql
    @client-directives/core
```

### Installation
```
    npm i @client-directives/ramda
```

### Supported functions:
For the most part most ramda functions of the form (a) => (b) => c have been converted
to the form @function(value: a) which will then receive (b) the field value returned then
call the function. If a function requires multiple parameters for setup tried to choose
appropriate naming conventions.

| Name | Example Usage | status |
|------|---------------|--------|
| add  | @add(value: 5)    | &#x2714;|
| assoc| @assoc(key: "key", value: "value")| &#x2714;|
| assocPath| @assocPath(path: ["path","to", "field"], value: "value")| &#x2714;|
| clamp| @clamp(value: [1, 10])| &#x2714;|
| concat| @concat(value: [2, 3, 4])| &#x2714;|
| contains| @contains(value: [2, 3, 4])| &#x2714; |
| countBy| @R(countBy: "toUpper")
| dec | @dec | &#x2714; |
| defaultTo | @defaultTo(value: 5)| <b>x<b> |
| difference | @difference(value: [2, 3, 4])| &#x2714; |
| dissoc | @dissoc(value: "b")| &#x2714; |
| dissocPath | @dissocPath(value: ["a", "b", "c"])| &#x2714; |
| divide (i) | @divide(value: 5)| &#x2714; |
| drop | @drop(value: 2) | &#x2714; |
| dropLast | @dropLast(value: 3) | &#x2714; |
| dropRepeats | @dropRepeats | &#x2714; |
| empty | @empty | &#x2714; |
| endsWith | @endsWith(value: "a") | &#x2714; |
| equals | @equals(value:  { a: "foo" }) | &#x2714; |
| F | @F | &#x2714; |
| fromPairs | @fromPairs | &#x2714; |
| gt | @gt(value: 2) | &#x2714; |
| gte | @gte(value: 3) | &#x2714; |
| has | @has(value: "name") | &#x2714; |
| hasPath | @hasPath(value: ["user", "firstName"]) | &#x2714; |
| head | @head | &#x2714; |
| identical | @identical(value: 5) | &#x2714; |
| identity | @identity) | <b>x</b>|
| inc | @inc | &#x2714; |
| includes | @includes(value: 3) | &#x2714; |
| indexBy | @indexBy(value: "id")| &#x2714; |
| indexOf | @indexOf(value: 3) | &#x2714; |
| init | @init | &#x2714; |
| insert | @insert(at: 3, value: 'x') | &#x2714; |
| insertAll | @insertAll(at: 3, value: [1, 2, 3]) | &#x2714; |
| intersection | @intersection(value: [1, 3, 4, 5]) | &#x2714; |
| intersperce | @intersperce(value: 'a') | &#x2714; |
| invert | @invert | &#x2714; |
| invertObj | @invertObj |  &#x2714; |
| isEmpty | @isEmpty | &#x2714; |
| isNil | @isNil ||
| join | @join(value: ' ') | &#x2714; |
| keys | @keys | &#x2714; |
| last | @last | &#x2714; |
| lastIndexOf | @lastIndexOf | &#x2714; |
| length | @length | &#x2714; |
| lt | @lt(value: 3) | &#x2714; |
| lte | @lte(value: 3) | &#x2714; |
| mathMod (ii) | @mathMod(value: 5) | &#x2714; |
| max | @max(value: 10) | &#x2714; |
| mean | @mean | &#x2714; |
| median | @median | &#x2714; |
| min | @min(value: 5) | &#x2714; |
| modulo | @modulo(value: 7) | |
| move | @move(from: 2, to: 5) | &#x2714; |
| multiply | @multiply(value: 2) | &#x2714; |
| negate | @negate | &#x2714; |
| not | @not | &#x2714; |
| nth | @nth(value: 4) | &#x2714; |
| omit | @omit(value: ["a", "foo"]) | &#x2714; |
| pair | @pair(value: "first") | &#x2714; |
| path | @path(value: ["a", "b", "c"]) | &#x2714; |
| pathOr | @pathOr(or: "foo", ["a", "b", "c"]) | &#x2714; |
| pick | @pick(value: ["foo", "bar"]) | &#x2714; |
| pickAll | @pickAll(value: ["foo", "bar"]) | |
| prepend | @prepend(value: "foo") | &#x2714; |
| product | @product | &#x2714; |
| project | @project(value: ["first", "last"]) | &#x2714; |
| prop | @prop(value: "foo") | &#x2714; |
| propOr | @propOr(or: "foo", value: "bar") | &#x2714; |
| props | @props(value: ["first", "last"]) | &#x2714; |
| range | @range(value: 5) | &#x2714; |
| remove | @remove(start: 1, count: 3) | &#x2714; |
| repeat | @repeat(value: "hi") | &#x2714; |
| reverse | @reverse | &#x2714; |
| slice | @slice(from: 2, to: 5) | &#x2714; |
| split | @slice(value: "/") | &#x2714; |
| splitAt | @splitAt(value: 3) | &#x2714; |
| splitEvery | @splitEvery(value: 3) | &#x2714; |
| startsWith | @startsWith(value: "a") | &#x2714; |
| subtract | @subtract(value: 2) | &#x2714; |
| sum | @sum | &#x2714; |
| symmetricDifference | @symmetricDifference(value: [1, 3, 4]) | |
| T | @T | &#x2714; |
| tail | @tail | &#x2714; |
| take | @take(value: 2) | &#x2714; |
| takeLast | @takeLast(value: 5) | &#x2714; |
| toLower | @toLower | &#x2714; |
| toPairs | @toPairs | &#x2714; |
| toString | @toString | &#x2714; |
| toUpper | @toUpper | &#x2714; |
| trim | @trim | &#x2714; |
| type | @type | &#x2714; |
| union | @union(value: [1, 3, 4]) | |
| uniq | @uniq | &#x2714; |
| update | @update(at: 2, value: "foo") | &#x2714; |
| values | @values | &#x2714; |
| whereEq | @whereEq(value: { foo: "bar" }) | |
| without | @without(value: [1, 2]) | &#x2714; |
| xprod | @xprod(value: [1, 3]) | |
| zip | @zip(value: ["a", "b", "c"]) | |
| zipObj | @zip(value: ["a", "b", "c" ]) | |


* &#x2714; indicates finished with tests
* <b>x</b> indicates some issue ran into.
* <b> </b>rest are undecided on api or if neccessary (or TODO).

 (i) Ramda divide is (numerator, denominator) => value, this is strictly @divide(value: denominator)
 (ii) Ramda mathMod is (number, mod) => value, this is @mathMod(modulo)


### What about Pipe/Compose?
```@client-directives automatically pipe directives left to right. Also directives are applied depth first.```

TODO:
* Finish implementation for  all outlined functions
* Implement functions that take a callback (map, filter,...) as (fn) => ({ props }) => value => ramdaFn(fn, ...props, value) so they can be initialized.
* Implement common patterns for functions that take a  callback as "extra" functions.
* Revisit API and signatures for 2nd release after use.