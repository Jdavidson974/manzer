import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Observable, find, tap } from 'rxjs';
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
    private formBuilder: FormBuilder,
  ) { }
  iconSearch = faSearch;
  @ViewChild('modalUpdate') modalUpdate!: ModalComponent;
  @ViewChild('modalCreate') modalCreate!: ModalComponent;
  @ViewChild('modalDelete') modalDelete!: ModalComponent;
  secteurs !: DataState<Secteur[]>;
  repas !: DataState<Repas[]>;
  allRepas!: Observable<Repas[] | null>;
  repasTab: Repas[] = []
  repasSelected !: number;
  createForm!: FormGroup;
  updateForm !: FormGroup;
  ngOnInit(): void {
    this.updateForm = this.formBuilder.group({
      name: this.formBuilder.control('', Validators.required),
      tag: this.formBuilder.control('', Validators.required),
    })
    this.createForm = this.formBuilder.group({
      name: this.formBuilder.control("", Validators.required),
      tag: this.formBuilder.control("", Validators.required),
    })
    this.secteurs = this.secteurService.secteursState;
    this.repas = this.repasService.myRepasState;
    this.allRepas = this.repas.value$.pipe(
      tap(
        repas => {
          if (repas) {
            this.repasTab = repas
          }

        }
      )
    )

  }
  openModalUpdate(id: number) {
    console.log(this.repasTab);
    this.repasSelected = id
    const repas = this.repasTab.find(item => item.id == this.repasSelected);
    if (repas) {
      this.updateForm.get('name')?.setValue(repas.name);
      this.updateForm.get('tag')?.setValue(repas.tag);

    } else {
      console.log('ko');

    }
    this.modalUpdate.open();
  }
  openModalDelete(id: number) {
    this.repasSelected = id;
    this.modalDelete.open();
  }
  openModalCreate() {
    this.modalCreate.open()
  }

  createRepas() {
    if (this.createForm.valid) {
      this.repasService.create(this.createForm.value);
    }
  }
  deleteRepas() {
    this.repasService.deleteRepas(this.repasSelected);
  }

  update() {
    if (this.updateForm.valid) {
      const data = { ...this.updateForm.value, idRepas: this.repasSelected }
      this.repasService.update(data)
    }

  }
}
