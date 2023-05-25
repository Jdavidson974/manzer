import { Component, ViewChild } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent {
  iconSearch = faSearch;
  @ViewChild('modalUpdate') modalUpdate!: ModalComponent;
  @ViewChild('modalCreate') modalCreate!: ModalComponent;
  @ViewChild('modalDelete') modalDelete!: ModalComponent;
  openModalUpdate() {
    this.modalUpdate.open();
  }
  openModalDelete() {
    this.modalDelete.open()
  }
  openModalCreate() {
    this.modalCreate.open()
  }
}
