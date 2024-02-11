import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from '../../service/client/client.service';
import { ClientForm } from 'src/app/model/client';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss'],
})
export class InscriptionComponent {
  paysList: any[] = [];
  liensDeParenteList: any[] = [];

  constructor(private Router: Router, private ClientService: ClientService) {}

  addNewClient(newClient: ClientForm) {
    console.log('Nouveau client reçu:', newClient);
    this.ClientService.addClient(newClient);
    this.Router.navigateByUrl('/login');
  }
}
