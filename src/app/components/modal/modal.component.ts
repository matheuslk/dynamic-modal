import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BaseModal } from 'src/app/data/models/base-modal.model';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent extends BaseModal {}
