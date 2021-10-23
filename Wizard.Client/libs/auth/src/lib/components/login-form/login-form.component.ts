import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { ReactiveFormService, ValidationService } from '@wizard/shared/utility';
import { LoginModel } from '@wizard/shared/data-models';
import { LoginFormModel } from './login-form.models';

@Component({
  selector: 'wizard-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ReactiveFormService]
})
export class LoginFormComponent {
  @Input() disableLoginBtn?: boolean;
  @Input() errorMessage?: string;
  @Output() authenticate = new EventEmitter<LoginModel>();
  model: LoginFormModel;

  constructor(loginForm: ReactiveFormService<LoginModel>) {
    this.model = new LoginFormModel(loginForm);
    this.initFormModel();
  }

  submit(): void {
    if (this.model.loginForm.isValid) {
      this.authenticate.emit(this.model.loginForm.value);
    }
  }

  private initFormModel(): void {
    const form: LoginModel = {
      username: '',
      password: ''
    };
    this.model.loginForm.createForm(form);
    this.model.loginForm.setValidators('username', ValidationService.requiredValidators);
    this.model.loginForm.setValidators('password', ValidationService.requiredValidators);
  }

}
