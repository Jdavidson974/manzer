import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { ToastComponent } from './toast/toast.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [

    ToastComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    SharedModule,
    RouterModule,
  ],
  exports: [ToastComponent]
})
export class CoreModule { }
