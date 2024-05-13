import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { CustomModalComponent } from '../../custom-modal.component';

@Component({
  selector: 'app-action-modal-footer',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './action-modal-footer.component.html',
  styleUrls: ['./action-modal-footer.component.scss'],
})
export class ActionModalFooterComponent {
  private modal = inject(CustomModalComponent);

  @Output() onConfirm = new EventEmitter<void>();
  @Input() isPrimaryButtonDisabled = false;

  ngAfterViewInit() {
    console.log('ActionModalFooterComponent - ngAfterViewInit');
  }

  ngOnDestroy() {
    console.log('ActionModalFooterComponent - ngOnDestroy');
  }

  handleClose() {
    this.modal.handleClose();
  }
}
