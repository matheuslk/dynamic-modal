import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-modal-overlay',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="overlay" (click)="handleClick()"></div>`,
  styles: [
    `
      .overlay {
        height: 100%;
        width: 100%;
        position: fixed;
        top: 0;
        left: 0;
        background: #000;
        opacity: 0.6;
        z-index: 999;
      }
    `,
  ],
})
export class ModalOverlayComponent {
  modalService = inject(ModalService);

  handleClick() {
    this.modalService.destroy();
  }
}
