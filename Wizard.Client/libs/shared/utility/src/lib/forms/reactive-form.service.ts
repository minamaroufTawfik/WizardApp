import { Injectable } from '@angular/core';
import { FormBuilder, AbstractControlOptions, FormGroup, ValidatorFn, ValidationErrors, AbstractControl,
   AsyncValidatorFn, FormControl } from '@angular/forms';

@Injectable()
export class ReactiveFormService<objType> {

  modelKeys: Record<keyof objType, keyof objType> = {} as any;
  form: FormGroup = {} as any;
  constructor(private formBuilder: FormBuilder) {
  }

  newInstance<T>(): ReactiveFormService<T> {
    return new ReactiveFormService<T>(this.formBuilder);
  }

  createForm(obj: objType, options?: AbstractControlOptions | { [key: string]: unknown; } | null): void {
    this.form = this.formBuilder.group(obj, options);
    this.fillFormModelKeys(obj);
  }

  set value(value: Readonly<objType>) {
    this.form.setValue(value);
  }

  get value(): Readonly<objType> {
    const val = this.form.getRawValue(); /* Get value with diabled controls */
    this.cleanStringProperties(val);
    return val;
  }

  get isValid(): boolean {
    return this.form.valid;
  }

  patchValue(value: Partial<objType>): void {
    this.form.patchValue(value);
  }

  reset(): void {
    this.form.reset();
  }

  controls(key: keyof objType, formGroup?: FormGroup): AbstractControl {
    return formGroup ? formGroup.controls[key as string] : this.form.controls[key as string];
  }

  getControl(controlKey: keyof objType): AbstractControl {
    return this.controls(controlKey);
  }

  setValidators(controlKey: keyof objType, newValidator: ValidatorFn | ValidatorFn[] | null): void {
    this.controls(controlKey).setValidators(newValidator);

  }

  setFormValidators(newValidator: ValidatorFn | ValidatorFn[] | null): void {
    this.form.setValidators(newValidator);
  }

  setAsyncValidators(controlKey: keyof objType, newValidator: AsyncValidatorFn | AsyncValidatorFn[] | null): void {
    this.controls(controlKey).setAsyncValidators(newValidator);
  }

  setControlOptions(controlKey: keyof objType, controlOptions: AbstractControlOptions): void {
    const control = new FormControl('', controlOptions);
    this.form.setControl(controlKey.toString(), control);
  }

  updateValidators(controlKey: keyof objType, newValidator: ValidatorFn | ValidatorFn[] | null): void {
    this.setValidators(controlKey, newValidator);
    this.controls(controlKey).updateValueAndValidity();
  }

  clearValidators(controlKey: keyof objType): void {
    this.controls(controlKey).clearValidators();
    this.controls(controlKey).updateValueAndValidity();
  }

  setErrors(controlKey: keyof objType, errors: ValidationErrors | null, formGroup?: FormGroup): void {
    this.controls(controlKey, formGroup).setErrors(errors);
  }

  private cleanStringProperties(obj: Record<string, unknown>): void {
    for (const propName in obj) {
        const prop = obj[propName];
        if (typeof prop === 'string') {
          obj[propName] = prop.trim();
        }
    }
  }

  private fillFormModelKeys(obj: objType): void {
    this.modelKeys = {} as Record<keyof objType, keyof objType>;
    for (const prop in obj) {
      this.modelKeys[prop] = prop;
    }
  }

}
