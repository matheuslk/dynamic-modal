import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from 'src/app/components/input/input.component';
import { IUserFormModalProps } from 'src/app/data/interfaces/modal.interface';
import { ModalFooterDirective } from 'src/app/directives/modal-footer.directive';
import { MODAL_DATA_TOKEN } from 'src/app/tokens/modal.token';
import { CustomModalComponent } from '../../custom-modal.component';
import { ActionModalFooterComponent } from '../../modal-footers/action-modal-footer/action-modal-footer.component';

@Component({
  selector: 'app-user-form-modal-content',
  standalone: true,
  imports: [
    CommonModule,
    ActionModalFooterComponent,
    ModalFooterDirective,
    InputComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './user-form-modal-content.component.html',
  styleUrls: ['./user-form-modal-content.component.scss'],
})
export class UserFormModalContentComponent {
  modalData: IUserFormModalProps = inject(MODAL_DATA_TOKEN);
  private modal = inject(CustomModalComponent);
  private formBuilder = inject(FormBuilder);

  form = this.formBuilder.group({
    name: this.formBuilder.control(null, Validators.required),
    surname: this.formBuilder.control(null, Validators.required),
    email: this.formBuilder.control(null, [
      Validators.required,
      Validators.email,
    ]),
  });

  ngAfterViewInit() {
    console.log('UserFormModalContentComponent - ngAfterViewInit');
  }

  ngOnDestroy() {
    console.log('UserFormModalContentComponent - ngOnDestroy');
  }

  handleConfirm() {
    this.modal.onConfirm.emit(this.form.value);
  }
}
