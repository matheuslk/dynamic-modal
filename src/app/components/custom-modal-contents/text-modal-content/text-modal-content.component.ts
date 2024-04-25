import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ModalFooterDirective } from 'src/app/directives/modal-footer.directive';
import { ActionModalFooterComponent } from '../../custom-modal-footers/action-modal-footer/action-modal-footer.component';

@Component({
  selector: 'app-text-modal-content',
  standalone: true,
  imports: [CommonModule, ActionModalFooterComponent, ModalFooterDirective],
  templateUrl: './text-modal-content.component.html',
  styleUrls: ['./text-modal-content.component.scss'],
})
export class TextModalContentComponent {
  ngAfterViewInit() {
    console.log('TextModalContentComponent - ngAfterViewInit');
  }

  ngOnDestroy() {
    console.log('TextModalContentComponent - ngOnDestroy');
  }
}
