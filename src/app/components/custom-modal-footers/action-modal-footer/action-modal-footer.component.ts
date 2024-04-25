import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CustomModalComponent } from '../../custom-modal/custom-modal.component';

@Component({
  selector: 'app-action-modal-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './action-modal-footer.component.html',
  styleUrls: ['./action-modal-footer.component.scss'],
})
export class ActionModalFooterComponent {
  private modal = inject(CustomModalComponent);

  ngAfterViewInit() {
    console.log('ActionModalFooterComponent - ngAfterViewInit');
  }

  ngOnDestroy() {
    console.log('ActionModalFooterComponent - ngOnDestroy');
  }
  handleClose() {
    this.modal.onConfirm.emit(null);
  }

  handleConfirm() {
    this.modal.onConfirm.emit();
  }
}