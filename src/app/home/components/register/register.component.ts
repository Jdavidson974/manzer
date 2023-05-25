import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { DataState } from 'src/app/shared/state/datastate';
import { SocialAccountRegister } from '../../models/socialAccountInfo';
import { take, tap } from 'rxjs';
import { Secteur } from '../../models/secteur.model';
import { SecteurService } from '../../services/secteur.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private secteurService: SecteurService,
  ) { }
  socialAccountInfo !: DataState<SocialAccountRegister>;
  secteurs!: DataState<Secteur[]>;
  formRegister!: FormGroup;
  inputSelected: number | null = null;
  ngOnInit(): void {
    this.formRegister = this.formBuilder.group({
      pseudo: this.formBuilder.control('', Validators.required),
    })
    this.secteurs = this.secteurService.secteursState;
    this.socialAccountInfo = this.authService.socialAccountInfo;
    this.socialAccountInfo.value$.pipe(
      tap(
        info => {
          if (info?.email && info.profilePicture) {
            this.router.navigate(['/register']);
          }
        }
      ),
    ).subscribe();
  }

  changeInputSelected(id: number) {
    this.inputSelected = id;
  }

  submit() {
    this.socialAccountInfo.value$.pipe(
      tap(
        info => {
          if (info) {
            const user = {
              email: info?.email,
              picture: info?.profilePicture,
              secteurId: this.inputSelected,
              username: this.formRegister.get('pseudo')?.value
            }
            this.authService.createAccount(user);
          }
        }
      )
    ).subscribe()
  }
}