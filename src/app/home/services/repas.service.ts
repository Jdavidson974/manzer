import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { DataState } from 'src/app/shared/state/datastate';
import { Repas } from '../models/repas.model';

@Injectable({
  providedIn: 'root'
})
export class RepasService extends ApiService {
  repasState: DataState<Repas[]> = new DataState<Repas[]>(null)
  getAllRepas() {
    this.get<Repas[]>('repas', this.repasState).subscribe()
  }
}
