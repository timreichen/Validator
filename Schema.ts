export enum ValueErrorCode {
  TYPE_ERROR = "TYPE_ERROR",

  EQUALS_ERROR = "EQUALS_ERROR",
  NOT_EQUALS_ERROR = "NOT_EQUALS_ERROR",

  MATCH_ERROR = "MATCH_ERROR",

  LENGTH_ERROR = "LENGTH_ERROR",
  MIN_ERROR = "MIN_ERROR",
  MAX_ERROR = "MAX_ERROR",

  INCLUDES_ERROR = "INCLUDES_ERROR",

  INVALID_PROPERTY_ERROR = "INVALID_PROPERTY_ERROR",
  REQUIRED_PROPERTY_ERROR = "REQUIRED_PROPERTY_ERROR",
}

export interface State {
  value: any;
  error?: ValueErrorCode;
}

export interface ObjectState extends State {
  errors: {
    [key: string]: ValueErrorCode;
  };
}

export class Schema {
  protected functions: ((state: State) => State)[];
  readonly options: {
    optional: boolean;
    [key: string]: boolean;
  };
  constructor(options = {}) {
    this.functions = [];
    this.options = {
      optional: false,
      ...options,
    };
  }
  validate(value: unknown): State | ObjectState {
    const state: State = { value };
    for (const fn of this.functions) {
      const nextState = fn(state);
      if (nextState.error) {
        return nextState;
      }
      state.value = nextState.value;
    }

    return state;
  }

  fn(validation: (state: State) => State) {
    this.functions.push(validation);
    return this;
  }
  optional() {
    this.options.optional = true;
  }
}
