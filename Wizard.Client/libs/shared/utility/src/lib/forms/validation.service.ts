import { ValidatorFn, Validators } from '@angular/forms';

export class ValidationService {
  private static readonly nonWhiteSpace: RegExp = /\S/;
  static get requiredValidators(): ValidatorFn[] {
    return [Validators.required, Validators.pattern(this.nonWhiteSpace)];
  }
}
