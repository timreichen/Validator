import { ValueErrorCode } from "./Schema.ts";
import { assertEquals } from "./deps.ts";
import { object, boolean, array } from "./mod.ts";

Deno.test("object value", () => {
  const value = {};
  const schema = object({});
  const result = schema.validate(value);
  assertEquals(result.value, value);
  assertEquals(result.error, undefined);
  assertEquals(result.errors, {});
});

Deno.test("object strip", () => {
  const value = {
    foo: true,
    bar: true,
  };
  const schema = object({
    foo: boolean(),
  }).strip();
  const result = schema.validate(value);
  assertEquals(result.value, { foo: true });
  assertEquals(result.error, undefined);
  assertEquals(result.errors, {});
});

Deno.test("object property error", () => {
  const value = {};
  const schema = object({
    foo: boolean(),
  }).strip();
  const result = schema.validate(value);
  assertEquals(result.value, {});
  assertEquals(result.error, undefined);
  assertEquals(result.errors.foo, ValueErrorCode.REQUIRED_PROPERTY_ERROR);
});

Deno.test("object nested", () => {
  const value = {
    foo: {
      bar: true,
    },
    doe: [true, false],
  };
  const schema = object({
    foo: object({
      bar: boolean(),
    }),
    doe: array(boolean()),
  });
  const result = schema.validate(value);

  assertEquals(result.value, {
    foo: {
      bar: true,
    },
    doe: [true, false],
  });
  assertEquals(result.error, undefined);
  assertEquals(result.errors, {});
});
