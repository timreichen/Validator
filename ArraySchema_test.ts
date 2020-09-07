import { ValueErrorCode } from "./Schema.ts";
import { assertEquals } from "./deps.ts";
import { array, boolean, string } from "./mod.ts";

Deno.test("array value", () => {
  const value: boolean[] = [];
  const schema = array(boolean());
  const result = schema.validate(value);
  assertEquals(result.values, {});
  assertEquals(result.error, undefined);
  assertEquals(result.errors, {});
});

Deno.test("array type", () => {
  const value: unknown[] = [true, "bar"];
  const schema = array([boolean(), string()]);
  const result = schema.validate(value);

  assertEquals(result.error, undefined);
  assertEquals(result.errors, {});
});

Deno.test("array type error 1", () => {
  const value: string[] = ["foo", "bar"];
  const schema = array(boolean());
  const result = schema.validate(value);
  assertEquals(result.errors[0], ValueErrorCode.TYPE_ERROR);
  assertEquals(result.errors[1], ValueErrorCode.TYPE_ERROR);
});

Deno.test("array type error 2", () => {
  const value: string[] = ["foo", "bar"];
  const schema = array([string(), boolean()]);
  const result = schema.validate(value);
  assertEquals(result.errors[1], ValueErrorCode.TYPE_ERROR);
});

Deno.test("array unexpected property error", () => {
  const value: string[] = ["foo"];
  const schema = array([string(), string()]);
  const result = schema.validate(value);
  assertEquals(result.errors[1], ValueErrorCode.REQUIRED_PROPERTY_ERROR);
});
