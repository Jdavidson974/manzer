import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './components/card/card.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ModalComponent } from './components/modal/modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingComponent } from './components/loading/loading.component';




@NgModule({
  declarations: [
    CardComponent,
    ModalComponent,
    LoadingComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    CardComponent,
    FontAwesomeModule,
    ModalComponent,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    LoadingComponent,
  ]
})
export class SharedModule { }
