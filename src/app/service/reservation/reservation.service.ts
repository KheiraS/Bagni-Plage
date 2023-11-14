import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, firstValueFrom, map } from 'rxjs';

import { Reservation, ReservationHttp } from '../../model/reservation';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  private apiUrl = 'http://localhost:8080/api';
  private baseUrl;
  private reservationsSubject: BehaviorSubject<Reservation[]> =
    new BehaviorSubject<Reservation[]>([]);
  private reservations$: Observable<Reservation[]> =
    this.reservationsSubject.asObservable();

  constructor(private http: HttpClient) {
    this.baseUrl = `${this.apiUrl}/reservations`;
    this.fetchReservations();
  }

  private fetchReservations(): void {
    this.getAll().then((data: Reservation[]) => {
      this.reservationsSubject.next(data);
      console.log('Reservations dans le service :', data);
    });
  }

  getAll(): Promise<Reservation[]> {
    return firstValueFrom(
      this.http.get<{ content: ReservationHttp[] }>(this.baseUrl).pipe(
        map((res) => {
          console.log("Réponse de l'API", res);
          return res.content.map(Reservation.mapperFromHttp);
        })
      )
    );
  }
}
