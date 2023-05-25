import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { ToastService } from '../services/toast.service';



@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.sass']
})
export class ToastComponent implements OnDestroy {

  constructor(public toastService: ToastService) { }

  isTemplate(toast: any) {
    return toast.content instanceof TemplateRef;
  }

  ngOnDestroy(): void {
    this.toastService.clear();
  }

}
