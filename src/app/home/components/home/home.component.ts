import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { DataState } from 'src/app/shared/state/datastate';
import { Secteur } from '../../models/secteur.model';
import { SecteurService } from '../../services/secteur.service';
import { RepasService } from '../../services/repas.service';
import { Repas } from '../../models/repas.model';
import { Observable, of, pipe, tap } from 'rxjs';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

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
    private secteurService: SecteurService,
    private formBuilder: FormBuilder,
  ) { }
  iconSearch = faSearch;
  secteurs !: DataState<Secteur[]>;
  secteurs$ !: Observable<Secteur[] | null>;
  repas !: DataState<Repas[]>;
  repasTab !: Observable<Repas[] | null>;
  initRepasTab !: Observable<Repas[] | null>;
  formSecteur!: FormGroup;
  ngOnInit(): void {
    this.formSecteur = this.formBuilder.group({
      checkbox: this.formBuilder.array([],)
    })
    const formArray = this.formSecteur.get('checkbox') as FormArray;
    this.secteurs = this.secteurService.secteursState;
    this.secteurs$ = this.secteurs.value$.pipe(
      tap(
        secteurs => {
          if (secteurs) {
            secteurs.map(
              secteur => {
                formArray.push(this.formBuilder.group({
                  checked: this.formBuilder.control(false),
                  value: this.formBuilder.control(secteur.id),
                }))
              }
            );
            //EXECUTER LE CODE POUR LE FILTRE ICI 
            this.formSecteur.valueChanges.pipe(
              tap(
                (value: { checkbox: { checked: boolean, value: number }[] }) => {
                  console.log(value
                  );

                  //je check tout les box checked,
                  // je met toute les valeur dans un tableau 
                  const tabId: number[] = [];
                  value.checkbox.forEach(item => {
                    if (item.checked) {
                      tabId.push(item.value)
                    }
                  })

                  // je verifie si le tableau est pas vide 
                  //Si vide repas reprend sa valuer initial
                  //si pas vide chercher tout les repas qui ont les id stocker dans le tableau
                  // repas prend la valeur du tableau en observable
                  if (tabId.length) {
                    this.initRepasTab.pipe(
                      tap(
                        repas => {
                          if (repas?.length) {
                            let newRepasTab: Repas[] = [];
                            tabId.forEach(id => {
                              const item = repas.filter(item => item.user.secteur.id == id);
                              if (item) {
                                newRepasTab = newRepasTab.concat(item)
                              }
                            });
                            this.repasTab = of(newRepasTab);
                          }
                        }
                      )
                    ).subscribe()
                  } else {
                    this.repasTab = this.initRepasTab;
                  }


                }
              )
            ).subscribe();

          }
        }
      )
    );
    this.repas = this.repasService.repasState;

    this.repasTab = this.repas.value$.pipe(
      tap(
        value => {
          this.initRepasTab = of(value);
        }
      )
    );

    const token = this.route.snapshot.queryParamMap.get('token');
    if (token) {
      localStorage.setItem('token', token);
      this.router.navigateByUrl('/mes-repas')
    }

  }

  filterSecteur(id: number) {


  }

  // this.initRepasTab.pipe(
  //   tap(
  //     repas => {
  //       repas.fi
  //     }
  //   )
  // ).subscribe()

}

