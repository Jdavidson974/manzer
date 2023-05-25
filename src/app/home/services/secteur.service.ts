import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { DataState } from 'src/app/shared/state/datastate';
import { Secteur } from '../models/secteur.model';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SecteurService extends ApiService {
  secteursState: DataState<Secteur[]> = new DataState<Secteur[]>(null);
  getSecteursList() {
    this.get<Secteur[]>("secteurs", this.secteursState).pipe(tap(a => console.log(a)
    )).subscribe();
  }
}
