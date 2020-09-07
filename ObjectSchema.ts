import { Schema, ValueErrorCode, ObjectState } from "./Schema.ts";

export class ObjectSchema extends Schema {
  schema: { [key: string]: Schema };
  readonly options!: {
    optional: boolean;
    strip: boolean;
  };
  constructor(schema: { [key: string]: Schema }) {
    super();
    this.options.strip = false;
    this.schema = schema;
    this.fn(({ value }) =>
      value instanceof Object
        ? { value }
        : { value, error: ValueErrorCode.TYPE_ERROR }
    );
  }

  private stripValues(values: { [key: string]: unknown }) {
    const keys = Object.keys(this.schema);
    const stripKeys = Object.keys(values).filter((key) => !keys.includes(key));
    stripKeys.forEach((stripKey) => delete values[stripKey]);
    return values;
  }

  validate(values: { [key: string]: unknown }) {
    const state = {
      ...super.validate(values),
      errors: {},
    } as ObjectState;

    if (this.options.strip) {
      values = this.stripValues(values);
    }

    for (const [key, schema] of Object.entries(this.schema)) {
      if (values[key] === undefined && !schema.options.optional) {
        state.errors[key] = ValueErrorCode.REQUIRED_PROPERTY_ERROR;
      } else {
        const nextState = schema.validate(values[key]);
        state.value[key] = nextState.value;
        if (nextState.error) {
          state.errors[key] = nextState.error!;
        }
      }
    }
    return state;
  }

  strip() {
    this.options.strip = true;
    return this;
  }
}
