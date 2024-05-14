import { Directive, TemplateRef, inject } from '@angular/core';
import { CustomModalComponent } from '../components/custom-modal/custom-modal.component';

@Directive({
  selector: '[appModalFooter]',
  standalone: true,
})
export class ModalFooterDirective {
  private modal = inject(CustomModalComponent);
  private templateRef = inject(TemplateRef);

  // O template do rodapé é passado para o "CustomModalComponent". Isso permite que o rodapé seja renderizado separadamente do conteúdo principal da modal.
  constructor() {
    console.log('ModalFooterDirective');
    this.modal.footerTemplate = this.templateRef;
  }
}
