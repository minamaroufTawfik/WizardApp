import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@wizard/shared/data-access';
import { LoginModel } from '@wizard/shared/data-models';
import { LoginModel as LoginComponentModel } from './login.models';

@Component({
  selector: 'wizard-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  model: LoginComponentModel;

  constructor(private router: Router, private authService: AuthService) {
    this.model = new LoginComponentModel();
  }

  authenticate(data: LoginModel) {
    this.model.disableLoginBtn = true;
    this.model.errorMessage = '';
    this.authService.login(data).subscribe(res => {
      if (res.isSuccess) {
        this.router.navigateByUrl('secure/steps');
      } else if (res.errorMessages?.length > 0) {
        this.model.errorMessage = res.errorMessages[0];
      }
      this.model.disableLoginBtn = false;
    })
  }

}
