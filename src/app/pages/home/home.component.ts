import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { Subject, filter, of, switchMap, take, tap } from 'rxjs';
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
    switchMap(() =>
      this.modalService.create().onConfirm.asObservable().pipe(take(1))
    ),
    filter((confirm) => confirm !== null),
    tap(() => {
      this.modalService.destroy();
    }),
    takeUntilDestroyed()
  );

  ngOnInit() {
    this.modalListener$.subscribe();
  }

  navigateToPage() {
    this.router.navigate(['default']);
  }
}
