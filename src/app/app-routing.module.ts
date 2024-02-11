import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientsComponent } from './page/clients/clients.component';
import { ParasolsComponent } from './page/parasols/parasols.component';
import { authGuard } from './guard/auth/auth.guard';
import { AuthComponent } from './page/auth/auth.component';
import { ErrorPageComponent } from './component/error-page/error-page.component';
import { InscriptionComponent } from './page/inscription/inscription.component';
import { EditClientComponent } from './page/edit-client/edit-client.component';
import { ClientComponent } from './page/client/client.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: 'login',
    //canActivate: [authGuard],
    component: AuthComponent,
  },
  {
    path: 'clients',
    canActivate: [authGuard],
    component: ClientsComponent,
  },
  {
    path: 'edit/:id',
    canActivate: [authGuard],
    component: EditClientComponent,
  },
  {
    path: 'parasols',
    canActivate: [authGuard],
    component: ParasolsComponent,
  },

  {
    path: 'inscription',
    component: InscriptionComponent,
  },
  {
    path: 'client',
    canActivate: [authGuard],
    component: ClientComponent,
  },
  {
    path: 'not-found',
    component: ErrorPageComponent,
  },
  {
    path: '**',
    redirectTo: 'not-found',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
