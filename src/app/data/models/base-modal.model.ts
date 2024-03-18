import {
  Directive,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  inject,
} from '@angular/core';
import { IModalData } from '../interfaces/modal-data.interface';
import { ModalService } from 'src/app/services/modal.service';

@Directive()
export abstract class BaseModal implements IModalData, OnDestroy {
  modalService = inject(ModalService);

  /**
   * emits `null` when modal is closing
   */
  @Output() onConfirm = new EventEmitter<any>();
  @Input() title: string = 'Título';

  ngOnDestroy(): void {
    this.onConfirm.emit(null);
  }
}
