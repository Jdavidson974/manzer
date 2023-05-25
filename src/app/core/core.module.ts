import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { ToastComponent } from './toast/toast.component';

@NgModule({
  declarations: [

    ToastComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ],
  exports: [ToastComponent]
})
export class CoreModule { }
