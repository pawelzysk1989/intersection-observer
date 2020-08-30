import { takeUntil } from 'rxjs/operators';
import { EmptyComponent } from './../components/empty/empty.component';
import { fromIntersectionObserver } from '../utils/from-intersection-observer';
import {
  Directive,
  TemplateRef,
  ViewContainerRef,
  OnInit,
  OnDestroy,
  ComponentFactoryResolver,
  ChangeDetectorRef,
} from '@angular/core';
import { Subject } from 'rxjs';

@Directive({
  selector: '[appDeferLoad]',
})
export class DeferLoadDirective
  implements OnInit, OnDestroy {
  destroy = new Subject();

  constructor(
    private templateRef: TemplateRef<any>,
    private vcr: ViewContainerRef,
    private resolver: ComponentFactoryResolver,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const componentFactory = this.resolver.resolveComponentFactory(
      EmptyComponent
    );
    const componentRef = this.vcr.createComponent(
      componentFactory
    );

    const intersection$ = fromIntersectionObserver(
      componentRef.location.nativeElement,
      (entry, observer, subscriber) => {
        if (entry.isIntersecting) {
          subscriber.next(true);
          subscriber.complete();
          observer.disconnect();
        }
      }
    );

    intersection$
      .pipe(takeUntil(this.destroy))
      .subscribe((_) => {
        this.vcr.clear();
        this.vcr.createEmbeddedView(this.templateRef);
        this.changeDetectorRef.detectChanges();
      });
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
