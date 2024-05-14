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
    // Sempre que ocorre uma troca de rota, qualquer modal ativa é destruída. Para testar esse comportamento, navegue para a rota "default", retorne à rota "home", abra uma modal e navegue novamente para a rota "default" pelo navegador.
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
    // Criação do componente "CustomModalComponent" juntamente com a injeção do "MODAL_DATA_TOKEN" que conterá qualquer dado que o usuário deseje transmitir à modal.
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

    // Criação do componente de conteúdo da modal. É importante destacar que o injetor da própria modal é passado para a propriedade "elementInjector" do componente. Dessa forma, todas as dependências acessíveis ao componente "CustomModalComponent" também ficam disponíveis para o componente de conteúdo, permitindo o acesso ao "MODAL_DATA_TOKEN".
    const modalContentRef = createComponent(data.contentType, {
      environmentInjector: this.appRef.injector,
      elementInjector: modalComponentRef.injector,
    });

    // Definição do título da modal.
    modalComponentRef.instance.title = data.title;
    // Definição do componente de conteúdo da modal que posteriormente será adicionado ao template.
    modalComponentRef.instance.contentRef = modalContentRef;

    // Criação do componente "ModalOverlayComponent" e injeção do "MODAL_REF_TOKEN" que armazenará a referência do componente "CustomModalComponent" que acabamos de criar, permitindo que a modal seja renderizada dentro do componente de overlay.
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

    // "ModalOverlayComponent" é inserido na raiz do elemento body HTML.
    this.appRef.attachView(this.modalOverlayComponentRef.hostView);
    document.body.append(
      (<EmbeddedViewRef<any>>this.modalOverlayComponentRef.hostView)
        .rootNodes[0]
    );

    return modalComponentRef.instance;
  }

  // Destrói o atual "ModalOverlayComponent" que posteriormente irá destruir o "CustomModalComponent" e seus componentes filhos.
  destroy() {
    if (!this.modalOverlayComponentRef) {
      return;
    }
    this.modalOverlayComponentRef.destroy();
    this.modalOverlayComponentRef = null;
  }
}
