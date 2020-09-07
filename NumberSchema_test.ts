import { ValueErrorCode } from "./Schema.ts";
import { assertEquals } from "./deps.ts";
import { number } from "./mod.ts";

Deno.test("number value", () => {
  const value = 10;
  const schema = number();
  const result = schema.validate(value);
  assertEquals(result.value, value);
  assertEquals(result.error, undefined);
});
Deno.test("number equals", () => {
  const value = 10;
  const schema = number().equals(10);
  const result = schema.validate(value);

  assertEquals(result.value, value);
  assertEquals(result.error, undefined);
});
Deno.test("number equals error", () => {
  const value = 10;
  const schema = number().equals(11);
  const result = schema.validate(value);
  assertEquals(result.value, value);
  assertEquals(result.error, ValueErrorCode.EQUALS_ERROR);
});
Deno.test("number notEquals", () => {
  const value = 10;
  const schema = number().notEquals(11);
  const result = schema.validate(value);
  assertEquals(result.value, value);
  assertEquals(result.error, undefined);
});
Deno.test("number notEquals error", () => {
  const value = 10;
  const schema = number().notEquals(10);
  const result = schema.validate(value);
  assertEquals(result.value, value);
  assertEquals(result.error, ValueErrorCode.NOT_EQUALS_ERROR);
});

Deno.test("number min", () => {
  const value = 10;
  const schema = number().min(0);
  const result = schema.validate(value);
  assertEquals(result.value, value);
  assertEquals(result.error, undefined);
});
Deno.test("number min error", () => {
  const value = 10;
  const schema = number().min(11);
  const result = schema.validate(value);
  assertEquals(result.value, value);
  assertEquals(result.error, ValueErrorCode.LENGTH_ERROR);
});

Deno.test("number max", () => {
  const value = 10;
  const schema = number().max(10);
  const result = schema.validate(value);
  assertEquals(result.value, value);
  assertEquals(result.error, undefined);
});
Deno.test("number max error", () => {
  const value = 10;
  const schema = number().max(9);
  const result = schema.validate(value);
  assertEquals(result.value, value);
  assertEquals(result.error, ValueErrorCode.LENGTH_ERROR);
});
