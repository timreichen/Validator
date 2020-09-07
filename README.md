# Validator
A lightweight value validator.

## API

### BooleanSchema
#### Methods
- equals
- notEquals

```js
import { boolean } from "deno.land/x/validator/mod.ts"

const schema = boolean()
const value = true
schema.validate(value) // returns { valid: true, value: true }
```

### NumberSchema
#### Methods
- equals
- notEquals
- min
- max

```js
import { number } from "deno.land/x/validator/mod.ts"

const schema = number().min(1).max(100)
const value = 10
schema.validate(value) // returns { valid: true, value: 10 }
```

### StringSchema
#### Methods
- equals
- notEquals
- length
- min
- max
- match
- includes

- trim

```js
import { string } from "deno.land/x/validator/mod.ts"

const schema = string().equals("foo")
const value = "foo"
schema.validate(value) // returns { valid: true, value: "foo" }
```

### DateSchema
#### Methods
- equals
- notEquals
- min
- max

```js
import { date } from "deno.land/x/validator/mod.ts"

const schema = date().min(new Date(2010)).max(new Date(2020))
const value = new Date(2015)
schema.validate(value) // returns { valid: true, value: "foo" }
```

### ObjectSchema
#### Methods
- strip

```js
import { object, number, string } from "deno.land/x/validator/mod.ts"

const schema = object({
  foo: boolean(),
  bar: string()
})

const value = {
  foo: true,
  bar: "doe"
}
schema.validate(value) // returns { valid: true, value: { foo: true, bar: "doe" }, values: { foo: true, bar: "doe" }, errors, {} }
```

### ArraySchema
#### Methods
- length
- min
- max

```js
import { object, number, string } from "deno.land/x/validator/mod.ts"

const schema = array(string())

const value = ["foo", "bar"]

schema.validate(value) // returns { valid: true, value: ["foo", "bar"], values: { 0: "foo", 1: "bar" }, errors, {} }
```
or
```js
import { object, number, string } from "deno.land/x/validator/mod.ts"

const schema = array([string(), number()])

const value = ["foo", 22]

schema.validate(value) // returns { valid: true, value: ["foo", 22], values: { 0: "foo", 1: 22 }, errors, {} }
```
