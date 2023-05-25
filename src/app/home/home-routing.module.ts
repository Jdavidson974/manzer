import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { GetSocialAccountInfoResolver } from './resolvers/get-social-account-info.resolver';
import { SecteurListResolver } from './resolvers/secteur-list.resolver';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "register",
    component: RegisterComponent, resolve: { accountInfo: GetSocialAccountInfoResolver, secteurs: SecteurListResolver }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
