import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GridComponent } from './components/grid/grid.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatCommonModule} from '@angular/material/core';
import { FormsModule } from '@angular/forms';

import {MatToolbarModule} from '@angular/material/toolbar';
import { MatSliderModule } from '@angular/material/slider';
import {MatButtonModule} from '@angular/material/button';
import {MatRadioModule} from '@angular/material/radio';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';




@NgModule({
  declarations: [
    AppComponent,
    GridComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    MatCommonModule,
    FormsModule,
    MatToolbarModule,
    MatSliderModule,
    MatButtonModule,
    MatRadioModule,
    MatIconModule,
    MatMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
