import {
  ApplicationRef,
  ComponentRef,
  EmbeddedViewRef,
  Injectable,
  Injector,
  createComponent,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { filter, skip, tap } from 'rxjs';
import { CustomModalComponent } from '../components/custom-modal/custom-modal.component';
import { ModalOverlayComponent } from '../components/modal-overlay/modal-overlay.component';
import { IModalData } from '../data/interfaces/modal.interface';
import { MODAL_DATA_TOKEN, MODAL_REF_TOKEN } from '../tokens/modal.token';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  constructor() {
    this.router.events.pipe(
      skip(1),
      filter((event) => event instanceof NavigationEnd),
      tap(() => {
        this.destroy();
      }),
      takeUntilDestroyed()
    );
  }

  private appRef = inject(ApplicationRef);
  private router = inject(Router);
  private modalOverlayComponentRef: ComponentRef<ModalOverlayComponent> | null =
    null;

  create(data: IModalData): CustomModalComponent {
    const modalComponentRef = createComponent(CustomModalComponent, {
      environmentInjector: this.appRef.injector,
      elementInjector: Injector.create({
        providers: [
          {
            provide: MODAL_DATA_TOKEN,
            useValue: data.data,
          },
        ],
      }),
    });
    const modalContentRef = createComponent(data.contentType, {
      environmentInjector: this.appRef.injector,
      elementInjector: modalComponentRef.injector,
    });

    modalComponentRef.instance.title = data.title;
    modalComponentRef.instance.contentRef = modalContentRef;

    this.modalOverlayComponentRef = createComponent(ModalOverlayComponent, {
      environmentInjector: this.appRef.injector,
      elementInjector: Injector.create({
        providers: [
          {
            provide: MODAL_REF_TOKEN,
            useValue: modalComponentRef,
          },
        ],
      }),
    });

    this.appRef.attachView(this.modalOverlayComponentRef.hostView);
    document.body.append(
      (<EmbeddedViewRef<any>>this.modalOverlayComponentRef.hostView)
        .rootNodes[0]
    );

    return modalComponentRef.instance;
  }

  destroy() {
    if (!this.modalOverlayComponentRef) {
      return;
    }
    this.modalOverlayComponentRef.destroy();
    this.modalOverlayComponentRef = null;
  }
}
