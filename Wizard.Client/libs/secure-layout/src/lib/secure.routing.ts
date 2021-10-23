import { Routes } from '@angular/router';
import { SecureLayoutComponent } from './components/layout/layout.component';

export const secureRoutes: Routes = [
  {
    path: '',
    component: SecureLayoutComponent,
    children: [
      {
        path: 'steps',
        loadChildren: () => import('@wizard/steps').then((m) => m.StepsModule),
      },
    ],
  },
];
