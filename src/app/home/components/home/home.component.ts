import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { DataState } from 'src/app/shared/state/datastate';
import { Secteur } from '../../models/secteur.model';
import { SecteurService } from '../../services/secteur.service';
import { RepasService } from '../../services/repas.service';
import { Repas } from '../../models/repas.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private repasService: RepasService,
  ) { }
  iconSearch = faSearch;
  secteurs !: DataState<Secteur[]>;
  repas !: DataState<Repas[]>;
  ngOnInit(): void {
    this.repas = this.repasService.myRepasState;
    const token = this.route.snapshot.queryParamMap.get('token');
    if (token) {
      localStorage.setItem('token', token);
      this.router.navigateByUrl('/mes-repas')
    }
  }

}
