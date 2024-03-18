import {
  ApplicationRef,
  ComponentRef,
  EmbeddedViewRef,
  Injectable,
  Type,
  createComponent,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationStart, Router } from '@angular/router';
import { filter, skip } from 'rxjs';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { IModalData } from '../data/interfaces/modal-data.interface';
import { ModalOverlayComponent } from '../components/modal-overlay/modal-overlay.component';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  constructor() {
    this.router.events
      .pipe(
        skip(1),
        filter((event) => event instanceof NavigationStart),
        takeUntilDestroyed()
      )
      .subscribe(() => {
        console.log('ROUTER EVENT');
        this.destroy();
      });
  }

  private appRef = inject(ApplicationRef);
  private router = inject(Router);
  private componentRef: ComponentRef<ModalComponent> | null = null;
  private overlayComponentRef: ComponentRef<ModalOverlayComponent> | null =
    null;

  create(data?: IModalData) {
    this.componentRef = createComponent(ModalComponent, {
      environmentInjector: this.appRef.injector,
    });
    this.overlayComponentRef = createComponent(ModalOverlayComponent, {
      environmentInjector: this.appRef.injector,
    });

    this.appRef.attachView(this.componentRef.hostView);
    this.appRef.attachView(this.overlayComponentRef.hostView);

    if (data) {
      this.componentRef.instance.title = data.title;
    }

    // append to body
    [this.componentRef.hostView, this.overlayComponentRef.hostView].forEach(
      (viewRef) => {
        document.body.append((<EmbeddedViewRef<any>>viewRef).rootNodes[0]);
      }
    );

    return this.componentRef.instance;
  }

  destroy() {
    this.destroyRef(this.componentRef);
    this.destroyRef(this.overlayComponentRef);

    this.componentRef = null;
    this.overlayComponentRef = null;
  }

  private destroyRef(
    ref: ComponentRef<ModalComponent | ModalOverlayComponent> | null
  ) {
    if (!ref) {
      return;
    }
    this.appRef.detachView(ref.hostView);
    ref.destroy();
  }
}
