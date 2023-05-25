import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { AuthGuard } from '../auth/guards/auth.guard';
import { ProfilResolver } from '../auth/resolvers/profil.resolver';

const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    children: [
      { path: "", loadChildren: () => import('../home/home.module').then(m => m.HomeModule), resolve: { login: ProfilResolver } },
      {
        path: "mes-repas", loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardModule),
        canActivate: [
          AuthGuard
        ]
      },
    ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
