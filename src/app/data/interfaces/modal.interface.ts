import { Type } from '@angular/core';

export interface IModalData<T = any> {
  title: string;
  contentType: Type<any>;
  data?: T;
}

export interface ITextModalProps {
  title: string;
  subtitle: string;
}

export interface IUserFormModalProps {
  title: string;
}
