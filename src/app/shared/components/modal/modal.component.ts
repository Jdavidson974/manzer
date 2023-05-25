import { Component, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.sass']
})
export class ModalComponent {

  constructor(private modalService: NgbModal) { }

  // modal template
  @ViewChild('content') content!: TemplateRef<any>;
  // title modal
  @Input() title!: string;
  @Input() size: 'sm' | 'lg' | 'xl' | 'none' = 'none';
  @Input() scrollable: boolean = true;
  @Output() onClose = new EventEmitter<void>();
  modalRef!: NgbModalRef;
  ngOnInit(): void {

  }
  /**
   * Open modal
   */
  open() {
    this.modalRef = this.modalService.open(
      this.content,
      {
        size: this.size,
        modalDialogClass: this.scrollable ?
          'modal-dialog-scrollable' :
          ''
      }
    );
  }
  /**
   * Close modal
   */
  close() {
    this.modalRef.close();
    this.onClose.emit();
  }
}
