import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientsComponent } from './page/clients/clients.component';
import { ParasolsComponent } from './page/parasols/parasols.component';

const routes: Routes = [
  {
    path: 'clients',
    component: ClientsComponent,
  },
  {
    path: 'parasols',
    component: ParasolsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
