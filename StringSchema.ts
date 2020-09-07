import { Schema, ValueErrorCode } from "./Schema.ts";

export class StringSchema extends Schema {
  constructor() {
    super();
    this.fn(({ value }) =>
      typeof value === "string" ? { value } : {
        value,
        error: ValueErrorCode.TYPE_ERROR,
      }
    );
  }
  equals(value: string) {
    return this.fn(({ value: val }) =>
      val === value ? { value: val } : {
        value: val,
        error: ValueErrorCode.EQUALS_ERROR,
      }
    );
  }
  notEquals(value: string) {
    return this.fn(({ value: val }) =>
      val !== value ? { value: val } : {
        value: val,
        error: ValueErrorCode.NOT_EQUALS_ERROR,
      }
    );
  }

  length(value: number) {
    return this.fn(({ value: val }) =>
      val.length === value ? { value: val } : {
        value: val,
        error: ValueErrorCode.LENGTH_ERROR,
      }
    );
  }
  min(value: number) {
    return this.fn(({ value: val }) =>
      val.length >= value ? { value: val } : {
        value: val,
        error: ValueErrorCode.MIN_ERROR,
      }
    );
  }
  max(value: number) {
    return this.fn(({ value: val }) =>
      val.length <= value ? { value: val } : {
        value: val,
        error: ValueErrorCode.MAX_ERROR,
      }
    );
  }

  trim() {
    return this.fn(({ value, error }) => ({
      value: value.trim(),
      error,
    }));
  }
  match(value: RegExp) {
    return this.fn(({ value: val }) =>
      value.test(val) ? { value: val } : {
        value: val,
        error: ValueErrorCode.MATCH_ERROR,
      }
    );
  }
  includes(value: string) {
    return this.fn(({ value: val }) =>
      val.includes(value) ? { value: val } : {
        value,
        error: ValueErrorCode.INCLUDES_ERROR,
      }
    );
  }
}
