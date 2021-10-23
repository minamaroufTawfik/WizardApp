import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedUiModule } from '@wizard/shared/ui'

import { LoginComponent } from './containers/login/login.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RouterModule } from '@angular/router';
import { authRoutes } from './auth.routing';

const authRoutesRouting: ModuleWithProviders<AuthModule> = RouterModule.forChild(authRoutes);

@NgModule({
  imports: [CommonModule, SharedUiModule, authRoutesRouting],
  declarations: [
    LoginComponent,
    LoginFormComponent
  ],
})
export class AuthModule {}
