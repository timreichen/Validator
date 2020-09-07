import { Schema, ValueErrorCode } from "./Schema.ts";

export class BooleanSchema extends Schema {
  constructor() {
    super();
    this.fn(({ value }) =>
      typeof value === "boolean" ? { value } : {
        value,
        error: ValueErrorCode.TYPE_ERROR,
      }
    );
  }

  equals(value: boolean) {
    return this.fn(({ value: val }) =>
      val === value ? { value: val } : {
        value: val,
        error: ValueErrorCode.EQUALS_ERROR,
      }
    );
  }
  notEquals(value: boolean) {
    return this.fn(({ value: val }) =>
      val !== value ? { value: val } : {
        value: val,
        error: ValueErrorCode.NOT_EQUALS_ERROR,
      }
    );
  }
}
