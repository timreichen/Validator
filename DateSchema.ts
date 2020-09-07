import { Schema, ValueErrorCode } from "./Schema.ts";

export class DateSchema extends Schema {
  constructor() {
    super();
    this.fn(({ value }) =>
      value instanceof Date ? { value } : {
        value,
        error: ValueErrorCode.TYPE_ERROR,
      }
    );
  }
  equals(value: Date) {
    return this.fn(({ value: val }) =>
      val.getTime() === value.getTime() ? { value: val } : {
        value: val,
        error: ValueErrorCode.EQUALS_ERROR,
      }
    );
  }
  notEquals(value: Date) {
    return this.fn(({ value: val }) =>
      val.getTime() !== value.getTime() ? { value: val } : {
        value: val,
        error: ValueErrorCode.NOT_EQUALS_ERROR,
      }
    );
  }
  min(value: Date) {
    return this.fn(({ value: val }) =>
      val.getTime() >= value.getTime() ? { value: val } : {
        value: val,
        error: ValueErrorCode.LENGTH_ERROR,
      }
    );
  }
  max(value: Date) {
    return this.fn(({ value: val }) =>
      val.getTime() <= value.getTime() ? { value: val } : {
        value: val,
        error: ValueErrorCode.LENGTH_ERROR,
      }
    );
  }
}
