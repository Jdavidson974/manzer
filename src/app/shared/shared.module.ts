import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './components/card/card.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ModalComponent } from './components/modal/modal.component';




@NgModule({
  declarations: [
    CardComponent,
    ModalComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
  ],
  exports: [
    CardComponent,
    FontAwesomeModule,
    ModalComponent
  ]
})
export class SharedModule { }
