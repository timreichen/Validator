import { ValueErrorCode } from "./Schema.ts";
import { assertEquals } from "./deps.ts";
import { string } from "./mod.ts";

Deno.test("string value", () => {
  const value = "foo";
  const schema = string();
  const result = schema.validate(value);
  assertEquals(result.value, value);
  assertEquals(result.error, undefined);
});
Deno.test("string equals", () => {
  const value = "foo";
  const schema = string().equals("foo");
  const result = schema.validate(value);
  assertEquals(result.value, value);
  assertEquals(result.error, undefined);
});
Deno.test("string equals error", () => {
  const value = "foo";
  const schema = string().equals("bar");
  const result = schema.validate(value);
  assertEquals(result.value, value);
  assertEquals(result.error, ValueErrorCode.EQUALS_ERROR);
});
Deno.test("string notEquals", () => {
  const value = "foo";
  const schema = string().notEquals("bar");
  const result = schema.validate(value);
  assertEquals(result.value, value);
  assertEquals(result.error, undefined);
});
Deno.test("string notEquals error", () => {
  const value = "foo";
  const schema = string().notEquals("foo");
  const result = schema.validate(value);
  assertEquals(result.value, value);
  assertEquals(result.error, ValueErrorCode.NOT_EQUALS_ERROR);
});

Deno.test("string min", () => {
  const value = "foo";
  const schema = string().min(3);
  const result = schema.validate(value);
  assertEquals(result.value, value);
  assertEquals(result.error, undefined);
});
Deno.test("string min error", () => {
  const value = "foo";
  const schema = string().min(4);
  const result = schema.validate(value);
  assertEquals(result.value, value);
  assertEquals(result.error, ValueErrorCode.MIN_ERROR);
});

Deno.test("string max", () => {
  const value = "foo";
  const schema = string().max(3);
  const result = schema.validate(value);
  assertEquals(result.value, value);
  assertEquals(result.error, undefined);
});
Deno.test("string max error", () => {
  const value = "foo";
  const schema = string().max(2);
  const result = schema.validate(value);
  assertEquals(result.value, value);
  assertEquals(result.error, ValueErrorCode.MAX_ERROR);
});

Deno.test("string match", () => {
  const value = "foo";
  const schema = string().match(/\w+/);
  const result = schema.validate(value);
  assertEquals(result.value, value);
  assertEquals(result.error, undefined);
});
Deno.test("string match error", () => {
  const value = "foo";
  const schema = string().match(/\d+/);
  const result = schema.validate(value);
  assertEquals(result.value, value);
  assertEquals(result.error, ValueErrorCode.MATCH_ERROR);
});

Deno.test("string length", () => {
  const value = "foo";
  const schema = string().length(3);
  const result = schema.validate(value);
  assertEquals(result.value, value);
  assertEquals(result.error, undefined);
});
Deno.test("string length error", () => {
  const value = "foo";
  const schema = string().length(10);
  const result = schema.validate(value);
  assertEquals(result.value, value);
  assertEquals(result.error, ValueErrorCode.LENGTH_ERROR);
});

Deno.test("string trim", () => {
  const value = " foo ";
  const schema = string().trim();
  const result = schema.validate(value);
  assertEquals(result.value, "foo");
  assertEquals(result.error, undefined);
});
