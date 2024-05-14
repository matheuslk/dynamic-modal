import {
  ComponentRef,
  Directive,
  TemplateRef,
  ViewContainerRef,
  inject,
} from '@angular/core';

@Directive({
  selector: '[appDynamicWrapper]',
  standalone: true,
})
export class DynamicWrapperDirective {
  private viewContainerRef = inject(ViewContainerRef);

  // Realiza a inserção de um componente previamente criado.
  insertComponent(componentRef: ComponentRef<any>) {
    this.viewContainerRef.insert(componentRef.hostView);
    componentRef.changeDetectorRef.detectChanges();
  }

  // Realiza a inserção de um template previamente criado.
  insertTemplate(templateRef: TemplateRef<any>) {
    const viewRef = this.viewContainerRef.createEmbeddedView(templateRef);
    viewRef.detectChanges();
  }
}
