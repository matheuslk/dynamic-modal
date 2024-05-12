import { ModalTypeEnum } from '../enums/modal-type.enum';

export type ModalType =
  | ModalTypeEnum.TEXT_MODAL
  | ModalTypeEnum.USER_FORM_MODAL;
