import { TextModalContentComponent } from 'src/app/components/custom-modal/modal-contents/text-modal-content/text-modal-content.component';
import { UserFormModalContentComponent } from 'src/app/components/custom-modal/modal-contents/user-form-modal-content/user-form-modal-content.component';
import {
  IModalData,
  ITextModalProps,
  IUserFormModalProps,
} from '../interfaces/modal.interface';
import { ModalType } from '../types/modal-type.type';

const TEXT_MODAL: IModalData<ITextModalProps> = {
  title: 'Modal com texto customizado',
  contentType: TextModalContentComponent,
  data: {
    title: 'Deseja confirmar as alterações?',
    subtitle: 'As alterações serão enviadas',
  },
};

const USER_FORM_MODAL: IModalData<IUserFormModalProps> = {
  title: 'Modal com texto customizado',
  contentType: UserFormModalContentComponent,
  data: {
    title: 'Preencha o formulário corretamente com seus dados:',
  },
};

export const MODAL_DATA: { [key in ModalType]: IModalData } = {
  TEXT_MODAL,
  USER_FORM_MODAL,
};
