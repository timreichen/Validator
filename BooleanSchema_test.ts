import { ValueErrorCode } from "./Schema.ts";
import { assertEquals } from "./deps.ts";
import { boolean } from "./mod.ts";

Deno.test("boolean value", () => {
  const value = true;
  const schema = boolean();
  const result = schema.validate(value);
  assertEquals(result.value, value);
  assertEquals(result.error, undefined);
});
Deno.test("boolean equals", () => {
  const value = true;
  const schema = boolean().equals(true);
  const result = schema.validate(value);
  assertEquals(result.value, value);
  assertEquals(result.error, undefined);
});
Deno.test("boolean equals error", () => {
  const value = false;
  const schema = boolean().equals(true);
  const result = schema.validate(value);
  assertEquals(result.value, value);
  assertEquals(result.error, ValueErrorCode.EQUALS_ERROR);
});
Deno.test("boolean notEquals", () => {
  const value = false;
  const schema = boolean().notEquals(true);
  const result = schema.validate(value);
  assertEquals(result.value, value);
  assertEquals(result.error, undefined);
});
Deno.test("boolean notEquals error", () => {
  const value = false;
  const schema = boolean().notEquals(false);
  const result = schema.validate(value);
  assertEquals(result.value, value);
  assertEquals(result.error, ValueErrorCode.NOT_EQUALS_ERROR);
});
