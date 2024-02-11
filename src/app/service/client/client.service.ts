import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, firstValueFrom, map, tap } from 'rxjs';
import { Client, ClientForm, ClientHttp } from 'src/app/model/client';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private apiUrl = 'http://localhost:8080/api';
  private baseUrl;
  private clientsSubject: BehaviorSubject<Client[]> = new BehaviorSubject<
    Client[]
  >([]);
  private clients$: Observable<Client[]> = this.clientsSubject.asObservable();

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {
    this.baseUrl = `${this.apiUrl}/clients`;
    this.fetchClients();
  }

  /**
   * Emit the new version of the clients
   */
  private fetchClients(): void {
    this.getAll().then((data: Client[]) => {
      this.clientsSubject.next(data);
      console.log('Clients dans le service :', data);
    });
  }

  /**
   * Method to retrieve all the clients
   * @returns
   */
  getAll(): Promise<Client[]> {
    return firstValueFrom(
      this.http.get<{ content: ClientHttp[] }>(this.baseUrl).pipe(
        map((res) => {
          console.log("Réponse de l'API", res);
          return res.content.map(Client.mapperFromHttp);
        })
      )
    );
  }

  addClient(clientToAdd: ClientForm): void {
    const clientToSend = {
      ...clientToAdd,
      paysDto: {
        code: clientToAdd.pays.code,
        nom: clientToAdd.pays.nom,
      },
      lienDeParenteDto: {
        id: clientToAdd.lienDeParente.id,
        nom: clientToAdd.lienDeParente.nom,
      },
    };
    console.log('client à envoyer: ', clientToSend);
    this.http
      .post<Client>(`http://localhost:8080/api/clients`, clientToSend)
      .subscribe((response) => {
        // La réponse du serveur est reçue ici
        console.log('Réponse du serveur:', response);
        console.log('client send: ', clientToSend);
        // Ajouter le client à la liste des clients
        // Ici, nous supposons que le serveur renvoie le client ajouté
        const newClient = response;
        const currentClients = this.clientsSubject.getValue();
        this.clientsSubject.next([...currentClients, newClient]);
      });
  }

  /**
   * Method to retrieve a client by ID in the clients array
   * @param clientId
   * @returns
   */
  getById(clientId: number): Promise<Client> {
    return firstValueFrom(
      this.http
        .get<ClientHttp>(`${this.baseUrl}/${clientId}`)
        .pipe(map((res) => Client.mapperFromHttp(res)))
    );
  }

  /**
   *
   * @param clientToEdit
   * @returns
   */
  editClient(clientToEdit: Client): Promise<Client> {
    const updatePayload: any = {
      ...clientToEdit,
      motDePasse:
        clientToEdit.motDePasse && clientToEdit.motDePasse.trim() !== ''
          ? clientToEdit.motDePasse
          : undefined,
      paysDto: {
        code: clientToEdit.pays.code,
        nom: clientToEdit.pays.nom,
      },
    };
    return firstValueFrom(
      this.http.patch<Client>(
        `${this.baseUrl}/${clientToEdit.id}`,
        updatePayload
      )
    );
  }

  /**
   * Method to delete a client to the array
   * @param idToDelete
   */
  async delete(clientId: number): Promise<void> {
    try {
      const response = await firstValueFrom(
        this.http
          .delete<Client>(`${this.apiUrl}/clients/${clientId}`)
          .pipe(tap((res) => console.log('Client effacé !', res)))
      );

      this.authService.logout();

      this.router.navigateByUrl('/');
    } catch (error) {
      console.error(error);
    }
  }
}
