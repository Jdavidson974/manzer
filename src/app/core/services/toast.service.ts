
import { Injectable, TemplateRef } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ToastService {
  toasts: any[] = [];

  show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
    this.toasts.push({ textOrTpl, ...options });
  }

  remove(toast: any) {
    this.toasts = this.toasts.filter((t) => t !== toast);
  }

  clear() {
    this.toasts.splice(0, this.toasts.length);
  }

  /**
   * Show toast with options on success
   * @param  {string | TemplateRef<any>} content
   */
  showSuccess(content: string | TemplateRef<any>) {
    this.show(content, { class: 'bg-success text-light', delay: 3000 });
  }

  showDanger(content: string | TemplateRef<any>) {
    this.show(content, { class: 'bg-danger text-light', delay: 3000 });
  }

}

