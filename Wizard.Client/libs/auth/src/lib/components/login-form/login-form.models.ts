import { LoginModel } from '@wizard/shared/data-models';
import { ReactiveFormService } from '@wizard/shared/utility';

export class LoginFormModel {
  constructor(public loginForm: ReactiveFormService<LoginModel>) {
  }
}
