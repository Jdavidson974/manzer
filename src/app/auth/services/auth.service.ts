import { Injectable } from '@angular/core';
import { SocialAccountRegister } from 'src/app/home/models/socialAccountInfo';
import { ApiService } from 'src/app/shared/services/api.service';
import { DataState } from 'src/app/shared/state/datastate';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends ApiService {

  socialAccountInfo: DataState<SocialAccountRegister> = new DataState<SocialAccountRegister>(null)
  createUserState: DataState<any> = new DataState<any>(null);
  setInfoAccountRegister(dataAccount: SocialAccountRegister) {
    this.socialAccountInfo.setValue$(dataAccount);
  }
  createAccount(data: any) {
    this.post<any>('utilisateurs/create', this.createUserState, data).subscribe();
  }
}
