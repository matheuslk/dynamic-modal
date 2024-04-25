import { Directive, TemplateRef, inject } from '@angular/core';
import { CustomModalComponent } from '../components/custom-modal/custom-modal.component';

@Directive({
  selector: '[appModalFooter]',
  standalone: true,
})
export class ModalFooterDirective {
  private modal = inject(CustomModalComponent);
  private templateRef = inject(TemplateRef);

  constructor() {
    console.log('ModalFooterDirective');
    this.modal.footerTemplate = this.templateRef;
  }
}
