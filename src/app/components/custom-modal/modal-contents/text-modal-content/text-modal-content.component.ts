import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ITextModalProps } from 'src/app/data/interfaces/modal.interface';
import { ModalFooterDirective } from 'src/app/directives/modal-footer.directive';
import { MODAL_DATA_TOKEN } from 'src/app/tokens/modal.token';
import { ActionModalFooterComponent } from '../../modal-footers/action-modal-footer/action-modal-footer.component';
import { CustomModalComponent } from '../../custom-modal.component';

@Component({
  selector: 'app-text-modal-content',
  standalone: true,
  imports: [CommonModule, ActionModalFooterComponent, ModalFooterDirective],
  templateUrl: './text-modal-content.component.html',
  styleUrls: ['./text-modal-content.component.scss'],
})
export class TextModalContentComponent {
  modalData: ITextModalProps = inject(MODAL_DATA_TOKEN);
  private modal = inject(CustomModalComponent);

  ngAfterViewInit() {
    console.log('TextModalContentComponent - ngAfterViewInit');
  }

  ngOnDestroy() {
    console.log('TextModalContentComponent - ngOnDestroy');
  }

  handleConfirm() {
    this.modal.onConfirm.emit();
  }
}
