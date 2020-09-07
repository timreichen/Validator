import { Schema, ValueErrorCode, ObjectState } from "./Schema.ts";

export class ArraySchema extends Schema {
  schema: Schema[] | Schema;
  readonly flags!: {
    optional: boolean;
  };
  constructor(schema: Schema | Schema[]) {
    super();
    this.schema = schema;
    this.fn(({ value }) =>
      Array.isArray(value) ? { value } : {
        value,
        error: ValueErrorCode.TYPE_ERROR,
      }
    );
  }

  validate(values: unknown[]): ObjectState {
    const state = {
      ...super.validate(values),
      values: {},
      errors: {},
    } as ObjectState;

    if (state.error) return state;

    if (Array.isArray(this.schema)) {
      for (const [index, schema] of this.schema.entries()) {
        const value = values[index];
        if (!value) {
          state.errors[index] = ValueErrorCode.REQUIRED_PROPERTY_ERROR;
        } else {
          const nextState = schema.validate(value);
          state.values[index] = nextState.value;
          if (nextState.error) {
            state.errors[index] = nextState.error!;
          }
        }
      }
    } else {
      const schema = this.schema as Schema;
      for (const [index, value] of values.entries()) {
        const nextState = schema.validate(value);
        state.values[index] = nextState.value;
        if (nextState.error) {
          state.errors[index] = nextState.error!;
        }
      }
    }

    return state;
  }
  length(length: number) {
    return this.fn(({ value }) =>
      value.length === length ? { value } : {
        value,
        error: ValueErrorCode.LENGTH_ERROR,
      }
    );
  }
  min(min: number) {
    return this.fn(({ value }) =>
      value.length >= min ? { value } : {
        value,
        error: ValueErrorCode.LENGTH_ERROR,
      }
    );
  }
  max(max: number) {
    return this.fn(({ value }) =>
      value.length <= max ? { value } : {
        value,
        error: ValueErrorCode.LENGTH_ERROR,
      }
    );
  }
}
