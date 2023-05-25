import { Component, OnInit } from '@angular/core';
import { Profil } from 'src/app/auth/models/profil.model';
import { AuthService } from 'src/app/auth/services/auth.service';
import { DataState } from 'src/app/shared/state/datastate';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.sass']
})
export class LayoutComponent implements OnInit {
  constructor(private authService: AuthService) { }
  urlServer: string = "http://localhost:3000/auth/login-google";
  profil !: DataState<Profil>;
  ngOnInit(): void {

  }

}
