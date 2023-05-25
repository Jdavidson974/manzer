import { Injectable } from '@angular/core';
import { SocialAccountRegister } from 'src/app/home/models/socialAccountInfo';
import { DataState } from 'src/app/shared/state/datastate';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  socialAccountInfo: DataState<SocialAccountRegister> = new DataState<SocialAccountRegister>(null)

  setInfoAccountRegister(dataAccount: SocialAccountRegister) {
    this.socialAccountInfo.setValue$(dataAccount);
  }

  constructor() { }
}
