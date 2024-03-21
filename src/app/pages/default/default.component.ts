import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-default',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="container">
    <p>default works!</p>
  </div>`,
})
export class DefaultComponent {}
