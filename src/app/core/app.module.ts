import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../material/material.module';
import { PageOneComponent } from '../pages/page-one/page-one.component';
import { AppRoutingModule } from './app-routing.module';
import { PageTwoComponent } from '../pages/page-two/page-two.component';
import { PageThreeComponent } from '../pages/page-three/page-three.component';
import { ReportComponent } from '../pages/report/report.component';

@NgModule({
  declarations: [
    AppComponent,
    PageOneComponent,
    PageTwoComponent,
    PageThreeComponent,
    ReportComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
