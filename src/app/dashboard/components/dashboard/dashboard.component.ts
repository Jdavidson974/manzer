import { Component, OnInit, ViewChild } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Repas } from 'src/app/home/models/repas.model';
import { Secteur } from 'src/app/home/models/secteur.model';
import { RepasService } from 'src/app/home/services/repas.service';
import { SecteurService } from 'src/app/home/services/secteur.service';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { DataState } from 'src/app/shared/state/datastate';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {
  constructor(
    private secteurService: SecteurService,
    private repasService: RepasService,
  ) { }
  iconSearch = faSearch;
  @ViewChild('modalUpdate') modalUpdate!: ModalComponent;
  @ViewChild('modalCreate') modalCreate!: ModalComponent;
  @ViewChild('modalDelete') modalDelete!: ModalComponent;
  secteurs !: DataState<Secteur[]>;
  repas !: DataState<Repas[]>;
  repasSelected !: number
  ngOnInit(): void {
    this.secteurs = this.secteurService.secteursState;
    this.repas = this.repasService.myRepasState;
  }
  openModalUpdate(id: number) {
    this.repasSelected = id
    this.modalUpdate.open();
  }
  openModalDelete(id: number) {
    this.repasSelected = id
    this.modalDelete.open()
  }
  openModalCreate() {
    this.modalCreate.open()
  }
}
