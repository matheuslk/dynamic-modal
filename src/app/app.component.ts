import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ModalComponent } from './components/modal/modal.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'dynamic-modal';
}
