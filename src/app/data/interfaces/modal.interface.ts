import { Type } from '@angular/core';

export interface IModalData {
  title: string;
  contentType: Type<any>;
  data?: any;
}

export interface ITextModalProps {
  title: string;
  subtitle: string;
}
