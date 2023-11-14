import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientsComponent } from './page/clients/clients.component';
import { HttpClientModule } from '@angular/common/http';
import { ParasolsComponent } from './page/parasols/parasols.component';
import { FormsModule } from '@angular/forms';
import { ReservationsComponent } from './page/reservations/reservations.component';

@NgModule({
  declarations: [AppComponent, ClientsComponent, ParasolsComponent, ReservationsComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
