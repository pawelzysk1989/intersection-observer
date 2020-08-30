import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ExampleComponent } from './widgets/example/example.component';
import { IntersectionModule } from './widgets/intersection/intersection.module';

@NgModule({
  declarations: [AppComponent, ExampleComponent],
  imports: [BrowserModule, IntersectionModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
