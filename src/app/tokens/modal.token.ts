import { ComponentRef, InjectionToken } from '@angular/core';
import { CustomModalComponent } from '../components/custom-modal/custom-modal.component';

export const MODAL_REF_TOKEN = new InjectionToken<
  ComponentRef<CustomModalComponent>
>('ModalRefToken');
export const MODAL_DATA_TOKEN = new InjectionToken<any>('ModalDataToken');
