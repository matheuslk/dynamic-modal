import { ModalTypesEnum } from '../enums/modal-types.enum';

export type ModalTypes =
  | ModalTypesEnum.CUSTOM_MODAL
  | ModalTypesEnum.STATIC_MODAL
  | ModalTypesEnum.FORM_MODAL;
