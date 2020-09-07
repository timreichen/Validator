import { Schema, ValueErrorCode } from "./Schema.ts";

export class NumberSchema extends Schema {
  constructor() {
    super();
    this.fn(({ value }) =>
      typeof value === "number" ? { value } : {
        value,
        error: ValueErrorCode.TYPE_ERROR,
      }
    );
  }
  equals(value: number) {
    return this.fn(({ value: val }) =>
      val === value ? { value: val } : {
        value: val,
        error: ValueErrorCode.EQUALS_ERROR,
      }
    );
  }
  notEquals(value: number) {
    return this.fn(({ value: val }) =>
      val !== value ? { value: val } : {
        value: val,
        error: ValueErrorCode.NOT_EQUALS_ERROR,
      }
    );
  }
  min(value: number) {
    return this.fn(({ value: val }) =>
      val >= value ? { value: val } : {
        value: val,
        error: ValueErrorCode.LENGTH_ERROR,
      }
    );
  }
  max(value: number) {
    return this.fn(({ value: val }) =>
      val <= value ? { value: val } : {
        value: val,
        error: ValueErrorCode.LENGTH_ERROR,
      }
    );
  }
}
