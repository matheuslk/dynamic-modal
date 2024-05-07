import { TextModalContentComponent } from 'src/app/components/custom-modal/modal-contents/text-modal-content/text-modal-content.component';
import { IModalData } from '../interfaces/modal.interface';

export const MODAL_DATA: { [key: string]: IModalData } = {
  TEXT_MODAL: {
    title: 'Modal com texto customizado',
    contentType: TextModalContentComponent,
    data: {
      title: 'Deseja confirmar as alterações?',
      subtitle: 'As alterações serão enviadas para um aprovador',
    },
  },
};
