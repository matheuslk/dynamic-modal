import { CommonModule } from '@angular/common';
import { Component, ViewChild, inject } from '@angular/core';
import { DynamicWrapperDirective } from 'src/app/directives/dynamic-wrapper.directive';
import { ModalService } from 'src/app/services/modal.service';
import { MODAL_REF_TOKEN } from 'src/app/tokens/modal.token';

@Component({
  selector: 'app-modal-overlay',
  standalone: true,
  imports: [CommonModule, DynamicWrapperDirective],
  template: `<div class="overlay" (click)="handleClick()">
    <ng-template #modalWrapper [appDynamicWrapper]></ng-template>
  </div>`,
  styles: [
    `
      .overlay {
        height: 100%;
        width: 100%;
        position: fixed;
        top: 0;
        left: 0;
        background-color: #00000073;
        z-index: 999;
      }
    `,
  ],
})
export class ModalOverlayComponent {
  private modalRef = inject(MODAL_REF_TOKEN);
  private modalService = inject(ModalService);

  @ViewChild('modalWrapper', { read: DynamicWrapperDirective })
  private modalWrapper!: DynamicWrapperDirective;

  ngAfterViewInit() {
    this.createModal();
  }

  private createModal() {
    this.modalWrapper.insertComponent(this.modalRef);
  }

  handleClick() {
    //this.modalService.destroy();
  }
}
