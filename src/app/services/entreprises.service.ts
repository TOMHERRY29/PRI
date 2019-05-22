import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Entreprise } from '../models/entreprise.model';

@Injectable({
  providedIn: 'root'
})
export class EntreprisesService {

  private entreprises: Entreprise[] = [];

  private entreprisesUpdated = new Subject<Entreprise[]>();
  private entreprisesStatusListener = new Subject<boolean>();
  constructor(private http: HttpClient) { }

  getEntreprises() {
    this.http
      .get<{ entreprises: any }>(
        'http://localhost:3000/entreprises'
      )
      .pipe(map((entreprisesData) => {
        return entreprisesData.entreprises.map(entreprises => {
          return {
            nomEntreprise: entreprises.nomEntreprise,
            idStagiaire: entreprises.idEntreprises
          };
        });
      }))
      .subscribe(transformedEntreprises => {
        console.log('get stagiaire', transformedEntreprises);
        this.entreprises = transformedEntreprises;
        this.entreprisesUpdated.next([...this.entreprises]);
      });

  }
  getStagiaireUpdateListener() {
    return this.entreprisesUpdated.asObservable();
  }

  getStagiaireById(id: any) {
    return this.http.get<{
      idEntreprise: string;
      nomEntreprise: string;
    }>('http://localhost:3000/entreprises/' + id);
  }

  addEntreprise(idEntreprise: string,
    nomEntreprise: string
  ) {
    const entreprise: Entreprise = {
      idEntreprise: idEntreprise,
      nomEntreprise: nomEntreprise
    };
    this.http
      .post<{ idEntreprise: string }>('http://localhost:3000/entreprises', entreprise)
      .subscribe(responseData => {
        const id = responseData.idEntreprise;
        entreprise.idEntreprise = id;
        this.entreprises.push(entreprise);
        this.entreprisesUpdated.next([...this.entreprises]);
      });
  }

  updateEntreprise(idEntreprise: string,
    nomEntreprise: string) {
    const entreprise: Entreprise = {
      idEntreprise: idEntreprise,
      nomEntreprise: nomEntreprise
    };
    this.http
      .put('http://localhost:3000/entreprises/' + idEntreprise, entreprise)
      .subscribe(response => {
        const updatedEntreprises = [...this.entreprises];
        const oldEntrepriseIndex = updatedEntreprises.findIndex(p => p.idEntreprise === entreprise.idEntreprise);
        updatedEntreprises[oldEntrepriseIndex] = entreprise;
        this.entreprises = updatedEntreprises;
        this.entreprisesUpdated.next([...this.entreprises]);
      });
  }

  deleteEntreprise(idEntreprise: string) {
    this.http.delete('http://localhost:3000/entreprises/' + idEntreprise)
      .subscribe(() => {
        const updatedEntreprises = this.entreprises.filter(entreprise => entreprise.idEntreprise !== idEntreprise);
        this.entreprises = updatedEntreprises;
        this.entreprisesUpdated.next([...this.entreprises]);
      });
  }




}











