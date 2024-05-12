import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ComponentRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  TemplateRef,
  ViewChild,
  inject,
} from '@angular/core';
import { DynamicWrapperDirective } from 'src/app/directives/dynamic-wrapper.directive';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, DynamicWrapperDirective],
  templateUrl: './custom-modal.component.html',
  styleUrls: ['./custom-modal.component.scss'],
})
export class CustomModalComponent implements AfterViewInit, OnDestroy {
  protected modalService = inject(ModalService);

  @Input() title: string = 'Custom Modal';
  @Input() contentRef!: ComponentRef<any>;
  @Input() footerTemplate?: TemplateRef<any>;
  /**
   * emits `null` when modal is closed
   */
  @Output() onConfirm = new EventEmitter<any>();

  @ViewChild('contentWrapper', { read: DynamicWrapperDirective })
  private contentWrapper!: DynamicWrapperDirective;
  @ViewChild('footerWrapper', { read: DynamicWrapperDirective })
  private footerWrapper!: DynamicWrapperDirective;

  ngAfterViewInit(): void {
    console.log('CustomModalComponent - ngAfterViewInit');
    this.createContent();
    this.createFooter();
  }

  private createContent() {
    this.contentWrapper.insertComponent(this.contentRef);
  }

  private createFooter() {
    if (!this.footerTemplate) {
      return;
    }
    this.footerWrapper.insertTemplate(this.footerTemplate);
  }

  handleClick(event: Event) {
    event.stopPropagation();
  }

  handleClose() {
    this.modalService.destroy();
  }

  ngOnDestroy(): void {
    console.log('CustomModalComponent - ngOnDestroy');
    this.onConfirm.emit(null);
  }
}
