import { ValueErrorCode } from "./Schema.ts";
import { assertEquals } from "./deps.ts";
import { date } from "./mod.ts";

Deno.test("date value", () => {
  const value = new Date();
  const schema = date();
  const result = schema.validate(value);
  assertEquals(result.value, value);
  assertEquals(result.error, undefined);
});
Deno.test("date equals", () => {
  const value = new Date();
  const schema = date().equals(new Date(value));
  const result = schema.validate(value);
  assertEquals(result.value, value);
  assertEquals(result.error, undefined);
});
Deno.test("date equals error", () => {
  const value = new Date();
  const schema = date().equals(new Date(1970));
  const result = schema.validate(value);
  assertEquals(result.value, value);
  assertEquals(result.error, ValueErrorCode.EQUALS_ERROR);
});
Deno.test("date notEquals", () => {
  const value = new Date();
  const schema = date().notEquals(new Date(1970));
  const result = schema.validate(value);
  assertEquals(result.value, value);
  assertEquals(result.error, undefined);
});
Deno.test("date notEquals error", () => {
  const value = new Date();
  const schema = date().notEquals(new Date(value));
  const result = schema.validate(value);
  assertEquals(result.value, value);
  assertEquals(result.error, ValueErrorCode.NOT_EQUALS_ERROR);
});

Deno.test("date min", () => {
  const value = new Date();
  const schema = date().min(new Date(1970));
  const result = schema.validate(value);
  assertEquals(result.value, value);
  assertEquals(result.error, undefined);
});
Deno.test("date min error", () => {
  const value = new Date(1970);
  const schema = date().min(new Date(2020));
  const result = schema.validate(value);
  assertEquals(result.value, value);
  assertEquals(result.error, ValueErrorCode.LENGTH_ERROR);
});

Deno.test("date max", () => {
  const value = new Date(1970);
  const schema = date().max(new Date());
  const result = schema.validate(value);
  assertEquals(result.value, value);
  assertEquals(result.error, undefined);
});
Deno.test("date max error", () => {
  const value = new Date(2020);
  const schema = date().max(new Date(1970));
  const result = schema.validate(value);
  assertEquals(result.value, value);
  assertEquals(result.error, ValueErrorCode.LENGTH_ERROR);
});
