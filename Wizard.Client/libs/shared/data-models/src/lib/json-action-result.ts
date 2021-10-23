export interface JsonActionResult<T = unknown> {
  isSuccess: boolean;
  result: T;
  displayMessage: string;
  errorMessages: string[];
}
