export type AJAX_STATE = "default" | "loading" | "success" | "failure";

export class APIHookState<T> {
  readonly state: AJAX_STATE = "default";

  readonly errorMessage: string | undefined;
  readonly data: T | undefined;

  private constructor(
    state: AJAX_STATE = "default",
    errorMessage?: string,
    data?: T | undefined
  ) {
    this.state = state;
    this.errorMessage = errorMessage;
    this.data = data;
  }

  static getDefaultState<T>() {
    return new APIHookState<T>();
  }

  static getLoadingState<T>(prevData?: T): APIHookState<T> {
    return new APIHookState<T>("loading", "", prevData);
  }

  static getSuccessState<T>(responseBody: T): APIHookState<T> {
    return new APIHookState<T>("success", undefined, responseBody);
  }

  static getFailureState<T>(errorMessage: string): APIHookState<T> {
    return new APIHookState<T>("failure", errorMessage);
  }
}
