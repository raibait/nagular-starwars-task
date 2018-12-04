import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';


import { AppComponent } from './app.component';
import { ListViewComponent } from './modules/list-view/list-view.component';
import { AddNewComponent } from './modules/add-new/add-new.component';
import { HeaderComponent } from './modules/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    ListViewComponent,
    AddNewComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
