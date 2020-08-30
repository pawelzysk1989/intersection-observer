import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeferLoadDirective } from './directives/defer-load.directive';
import { EmptyComponent } from './components/empty/empty.component';

@NgModule({
  declarations: [DeferLoadDirective],
  imports: [CommonModule],
  exports: [DeferLoadDirective],
  entryComponents: [EmptyComponent],
})
export class IntersectionModule {}
