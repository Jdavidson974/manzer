import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class GetSocialAccountInfoResolver implements Resolve<void> {
  constructor(private authService: AuthService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): void {
    const params: any = route.queryParams;
    let dataAccount !: SocialAccountRegister
    //CONEXION VIA GOOGLE
    if (params.type == "google") {
      dataAccount = {
        type: params.type,
        email: params.email,
        lastName: params.nom,
        firstName: params.prenom,
        profilePicture: params.photo,
      };
    }
    if (dataAccount) {
      this.authService.setInfoAccountRegister(dataAccount);
    }
  }
}
