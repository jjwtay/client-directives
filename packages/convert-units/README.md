# @client-directives/convert-units
Convert fields from one unit to the other.

### Peer Dependencies
```
    convert-units
    graphql
    @client-directives/core
```

### Installation
```
    npm i @client-directives/convert-units
```

###  How to:
Convert-units works as
```
    import { convert } from 'convert-units'

    convert(value).from(fromString).to(toString)
```

To use as a client directive the syntax is simply
```
    import convert from '@client-directives/convert-units'

    @convert(from: fromString, to: toString)
```

### Example Usage
```
    query {
        getCars(id: 5) {
            speed @convert(from: "m/h", to: "km/h")
        }
    }
```

### See 