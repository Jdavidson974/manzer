import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SecteurListResolver } from './home/resolvers/secteur-list.resolver';
import { RepasResolver } from './home/resolvers/repas.resolver';
const routes: Routes = [
  {
    path: "",
    loadChildren: () => import("./layout/layout.module").then(m => m.LayoutModule),
    resolve: { secteurs: SecteurListResolver, repas: RepasResolver }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
