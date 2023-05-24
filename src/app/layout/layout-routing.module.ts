import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';

const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    children: [
      { path: "", loadChildren: () => import('../home/home.module').then(m => m.HomeModule) },
      { path: "mes-repas", loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardModule) },
    ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
