import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PublicLayoutComponent } from '@wizard/public-layout';
import { AccessGuard } from '@wizard/shared/data-access';

const appRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'auth/login',
  },
  {
    path: 'auth',
    data: { anonymousOnly: true },
    component: PublicLayoutComponent,
    canActivate: [AccessGuard],
    loadChildren: () => import('@wizard/auth').then((m) => m.AuthModule),
  },
  {
    path: 'secure',
    data: { requireLogin: true },
    canActivate: [AccessGuard],
    loadChildren: () => import('@wizard/secure-layout').then((m) => m.SecureLayoutModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {
      useHash: false,
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
