import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ListViewComponent } from './modules/list-view/list-view.component';
import { AddNewComponent } from './modules/add-new/add-new.component';

@NgModule({
  declarations: [
    AppComponent,
    ListViewComponent,
    AddNewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
