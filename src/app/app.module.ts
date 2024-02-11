import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientsComponent } from './page/clients/clients.component';
import { HttpClientModule } from '@angular/common/http';
import { ParasolsComponent } from './page/parasols/parasols.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReservationsComponent } from './page/reservations/reservations.component';
import { AuthComponent } from './page/auth/auth.component';
import { AuthService } from './service/auth/auth.service';
import { ErrorPageComponent } from './component/error-page/error-page.component';
import { InscriptionComponent } from './page/inscription/inscription.component';
import { FormClientComponent } from './component/form-client/form-client.component';
import { ClientComponent } from './page/client/client.component';

import { EditClientComponent } from './page/edit-client/edit-client.component';
import { HeaderComponent } from './component/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    ClientsComponent,
    ParasolsComponent,
    ReservationsComponent,
    AuthComponent,
    ErrorPageComponent,
    InscriptionComponent,
    FormClientComponent,
    ClientComponent,
    EditClientComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
