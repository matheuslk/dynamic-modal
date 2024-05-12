import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { Subject, exhaustMap, filter, take, tap } from 'rxjs';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { MODAL_DATA } from 'src/app/data/consts/modal-data.const';
import { ModalTypeEnum } from 'src/app/data/enums/modal-type.enum';
import { ModalType } from 'src/app/data/types/modal-type.type';

import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  MODAL_TYPE_ENUM = ModalTypeEnum;

  modalService = inject(ModalService);
  router = inject(Router);

  openModal$: Subject<ModalType> = new Subject();
  private modalListener$ = this.openModal$.pipe(
    exhaustMap((modalType) =>
      this.modalService
        .create(MODAL_DATA[modalType])
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
