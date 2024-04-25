import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { Subject, exhaustMap, filter, take, tap } from 'rxjs';
import { TextModalContentComponent } from 'src/app/components/custom-modal-contents/text-modal-content/text-modal-content.component';

import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
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
        .create({
          title: 'Modal customizada',
          contentType: TextModalContentComponent,
          data: {
            test: 'test',
          },
        })
        .onConfirm.asObservable()
        .pipe(
          take(1),
          filter((confirm) => confirm !== null),
          tap(() => {
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
