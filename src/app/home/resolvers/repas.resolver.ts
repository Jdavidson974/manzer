import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { RepasService } from '../services/repas.service';

@Injectable({
  providedIn: 'root'
})
export class RepasResolver implements Resolve<void> {
  constructor(private repasService: RepasService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): void {
    this.repasService.getAllRepas();
  }
}
