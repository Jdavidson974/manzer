import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { SocialAccountRegister } from '../models/socialAccountInfo';

@Injectable({
  providedIn: 'root'
})
export class GetSocialAccountInfoResolver implements Resolve<void> {
  constructor(private authService: AuthService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): void {
    const params: any = route.queryParams;
    let dataAccount !: SocialAccountRegister
    //CONEXION VIA GOOGLE
    dataAccount = {
      email: params.email,
      profilePicture: params.photo,
      firstname: params.prenom,
      lastname: params.nom,
    };
    if (dataAccount) {
      this.authService.setInfoAccountRegister(dataAccount);
    }
  }
}
