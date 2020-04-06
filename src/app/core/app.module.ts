import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { MaterialModule } from '../material/material.module';
import { PageOneComponent } from '../pages/page-one/page-one.component';
import { AppRoutingModule } from './app-routing.module';
import { PageTwoComponent } from '../pages/page-two/page-two.component';
import { PageThreeComponent } from '../pages/page-three/page-three.component';
import { ReportComponent } from '../pages/report/report.component';
import { AuthComponent } from '../pages/auth/auth.component';

@NgModule({
  declarations: [
    AppComponent,
    PageOneComponent,
    PageTwoComponent,
    PageThreeComponent,
    ReportComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
