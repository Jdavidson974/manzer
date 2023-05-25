import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { SocialAccountRegister } from 'src/app/home/models/socialAccountInfo';
import { ApiService } from 'src/app/shared/services/api.service';
import { DataState } from 'src/app/shared/state/datastate';
import { Profil } from '../models/profil.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends ApiService {


  socialAccountInfo: DataState<SocialAccountRegister> = new DataState<SocialAccountRegister>(null)
  createUserState: DataState<any> = new DataState<any>(null);
  profilState: DataState<Profil> = new DataState<Profil>(null);
  isLogged: Observable<boolean> = of(false);
  setInfoAccountRegister(dataAccount: SocialAccountRegister) {
    this.socialAccountInfo.setValue$(dataAccount);
  }
  createAccount(data: any) {
    this.post<any>('utilisateurs/create', this.createUserState, data).subscribe();
  }

  getProfil() {
    return this.get<Profil>('auth/profil', this.profilState).pipe(
      tap(
        isConnected => {
          if (isConnected) {
            this.isLogged = of(true)
          }
        }
      )
    )
  }
}
