import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { Subject, exhaustMap, filter, take, tap } from 'rxjs';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { MODAL_DATA } from 'src/app/data/const/modal-data.const';

import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  modalService = inject(ModalService);
  router = inject(Router);

  openModal$: Subject<void> = new Subject();
  private modalListener$ = this.openModal$.pipe(
    exhaustMap(() =>
      this.modalService
        .create(MODAL_DATA['TEXT_MODAL'])
        .onConfirm.asObservable()
        .pipe(
          take(1),
          filter((confirm) => confirm !== null),
          tap(() => {
            console.log('TEXT MODAL CONFIRM');
            this.modalService.destroy();
          })
        )
    ),
    takeUntilDestroyed()
  );

  ngOnInit() {
    this.setListeners();
  }

  private setListeners() {
    this.modalListener$.subscribe();
  }

  navigateToPage() {
    this.router.navigate(['default']);
  }
}
