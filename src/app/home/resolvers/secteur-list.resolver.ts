import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { SecteurService } from '../services/secteur.service';

@Injectable({
  providedIn: 'root'
})
export class SecteurListResolver implements Resolve<void> {
  constructor(private secteurService: SecteurService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): void {
    this.secteurService.getSecteursList();
  }
}
