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

  insertComponent(componentRef: ComponentRef<any>) {
    this.viewContainerRef.insert(componentRef.hostView);
    componentRef.changeDetectorRef.detectChanges();
  }

  insertTemplate(templateRef: TemplateRef<any>) {
    const viewRef = this.viewContainerRef.createEmbeddedView(templateRef);
    viewRef.detectChanges();
  }
}
