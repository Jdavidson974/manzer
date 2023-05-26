import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Observable, find, of, tap } from 'rxjs';
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
  createState!: DataState<Repas>;
  updateState!: DataState<Repas>;
  deleteState!: DataState<Repas>;
  formSearch!: FormGroup;
  initRepasTab !: Observable<Repas[] | null>;
  repasTab$ !: Observable<Repas[] | null>
  titleRepasModal: string = "";
  ngOnInit(): void {


    this.createState = this.repasService.createRepasState;
    this.updateState = this.repasService.updateRepasState;
    this.deleteState = this.repasService.deleteRepasState;
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
    this.repasTab$ = this.repas.value$.pipe(
      tap(
        repas => {
          if (repas) {
            console.log(repas
            );

            this.repasTab = repas
            this.initRepasTab = of(repas)
          }

        }
      )
    )

    this.formSearch = this.formBuilder.group({
      search: this.formBuilder.control('', Validators.required)
    });
    this.formSearch.valueChanges.pipe(
      tap(
        (value: { search: string }) => {
          const search = value.search;
          if (search.length) {
            this.initRepasTab.pipe(
              tap(
                repas => {
                  if (repas?.length) {
                    let newRepasFilter: Repas[] = []
                    repas.filter(item => {
                      if (item.name.startsWith(search) || item.tag.startsWith(search) || item.user.username.startsWith(search)) {
                        newRepasFilter = newRepasFilter.concat(item);
                      }
                    });
                    this.repasTab$ = of(newRepasFilter);

                  }
                }
              )
            ).subscribe()
          } else {
            this.repasTab$ = this.initRepasTab
          }

        }
      )
    ).subscribe()

  }
  openModalUpdate(id: number) {
    console.log(this.repasTab);
    this.repasSelected = id
    const repas = this.repasTab.find(item => item.id == this.repasSelected);
    if (repas) {
      this.titleRepasModal = repas.name;
      this.updateForm.get('name')?.setValue(repas.name);
      this.updateForm.get('tag')?.setValue(repas.tag);

    }
    this.modalUpdate.open();
  }
  openModalDelete(id: number) {
    this.repasSelected = id
    const repas = this.repasTab.find(item => item.id == this.repasSelected);
    if (repas) {
      this.titleRepasModal = repas.name;
      this.updateForm.get('name')?.setValue(repas.name);
      this.updateForm.get('tag')?.setValue(repas.tag);

    }
    this.modalDelete.open();
  }
  openModalCreate() {
    this.modalCreate.open()
  }

  createRepas() {
    if (this.createForm.valid) {
      this.repasService.create(this.createForm.value);
      this.createState.isLoading$.pipe(
        tap(
          isLoading => {
            if (!isLoading) {
              this.repasService.getAllMyRepas();
              this.modalCreate.close()
              this.createForm.reset();
            }
          }
        )
      ).subscribe()
    }
  }
  deleteRepas() {
    this.repasService.deleteRepas(this.repasSelected);
    this.deleteState.isLoading$.pipe(
      tap(
        isLoading => {
          if (!isLoading) {
            this.repasService.getAllMyRepas();
            this.modalDelete.close()
          }
        }
      )
    ).subscribe()
  }

  update() {
    if (this.updateForm.valid) {
      const data = { ...this.updateForm.value, idRepas: this.repasSelected }
      this.repasService.update(data)
      this.updateState.isLoading$.pipe(
        tap(
          isLoading => {
            if (!isLoading) {
              this.repasService.getAllMyRepas();
              this.modalUpdate.close()
            }
          }
        )
      ).subscribe()
    }

  }
}
