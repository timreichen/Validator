import { Schema } from "./Schema.ts";
import { BooleanSchema } from "./BooleanSchema.ts";
import { NumberSchema } from "./NumberSchema.ts";
import { StringSchema } from "./StringSchema.ts";
import { ObjectSchema } from "./ObjectSchema.ts";
import { ArraySchema } from "./ArraySchema.ts";
import { DateSchema } from "./DateSchema.ts";

export { Schema } from "./Schema.ts";
export { BooleanSchema } from "./BooleanSchema.ts";
export { NumberSchema } from "./NumberSchema.ts";
export { StringSchema } from "./StringSchema.ts";
export { ObjectSchema } from "./ObjectSchema.ts";
export { ArraySchema } from "./ArraySchema.ts";
export { DateSchema } from "./DateSchema.ts";

export function value() {
  return new Schema();
}

export function boolean() {
  return new BooleanSchema();
}

export function number() {
  return new NumberSchema();
}

export function string() {
  return new StringSchema();
}

export function object(schema: { [key: string]: Schema }) {
  return new ObjectSchema(schema);
}

export function array(schema: Schema | Schema[]) {
  return new ArraySchema(schema);
}

export function date() {
  return new DateSchema();
}
