import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { RepasService } from 'src/app/home/services/repas.service';

@Injectable({
  providedIn: 'root'
})
export class MyRepasResolver implements Resolve<void> {
  constructor(private repasService: RepasService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): void {
    this.repasService.getAllMyRepas();
  }
}
