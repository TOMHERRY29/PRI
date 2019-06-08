import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Pays } from '../models/pays.model';

@Injectable({
  providedIn: 'root'
})
export class PaysService {

  private pays: Pays[] = [];

  private paysUpdated = new Subject<Pays[]>();
  private paysStatusListener = new Subject<boolean>();
  constructor(private http: HttpClient) { }

  getPays() {
    this.http
      .get<{ pays: any }>(
        'http://localhost:3000/pays'
      )
      .pipe(map((paysData) => {
        return paysData.pays.map(pays => {
          return {
            idPays: pays.idPays,
            nomPays: pays.nomPays
          };
        });
      }))
      .subscribe(transformedPays => {
        console.log('get pays', transformedPays);
        this.pays = transformedPays;
        this.paysUpdated.next([...this.pays]);
      });

  }
  getPaysUpdateListener() {
    return this.paysUpdated.asObservable();
  }

  getPaysById(id: any) {
    return this.http.get<{
      idPays: string;
      nomPays: string;
    }>('http://localhost:3000/pays/' + id);
  }



  addPays(idPays: string,
    nomPays: string
  ) {
    const pays: Pays = {
      idPays: idPays,
      nomPays: nomPays,
    };
    this.http
      .post<{ idPays: string }>('http://localhost:3000/pays', pays)
      .subscribe(responseData => {
        const id = responseData.idPays;
        pays.idPays = id;
        this.pays.push(pays);
        this.paysUpdated.next([...this.pays]);
      });
  }

  updatePays(idPays: string,
    nomPays: string
  ) {
    const pays: Pays = {
      idPays: idPays,
      nomPays: nomPays,
    };
    this.http
      .put('http://localhost:3000/pays/' + idPays, pays)
      .subscribe(response => {
        const updatedPays = [...this.pays];
        const oldPaysIndex = updatedPays.findIndex(p => p.idPays === pays.idPays);
        updatedPays[oldPaysIndex] = pays;
        this.pays = updatedPays;
        this.paysUpdated.next([...this.pays]);
      });
  }

  deleteStagiaire(idPays: string) {
    this.http.delete('http://localhost:3000/pays/' + idPays)
      .subscribe(() => {
        const updatedPays = this.pays.filter(stagiaire => stagiaire.idPays !== idPays);
        this.pays = updatedPays;
        this.paysUpdated.next([...this.pays]);
      });
  }



}
