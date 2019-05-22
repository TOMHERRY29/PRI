import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Stagiaire } from '../models/stagiaire.model';

@Injectable({
  providedIn: 'root'
})
export class StagiairesService {

  private stagiaires: Stagiaire[] = [];

  private stagiairesUpdated = new Subject<Stagiaire[]>();
  private stagiaireStatusListener = new Subject<boolean>();
  constructor(private http: HttpClient) { }

  getStagiaire() {
    this.http
      .get<{ stagiaires: any }>(
        'http://localhost:3000/stagiaire'
      )
      .pipe(map((stagiaireData) => {
        return stagiaireData.stagiaires.map(stagiaire => {
          return {
            Nom: stagiaire.Nom,
            Prenom: stagiaire.Prenom,
            idStagiaire: stagiaire.idStagiaire
          };
        });
      }))
      .subscribe(transformedStagiaires => {
        console.log('get stagiaire', transformedStagiaires);
        this.stagiaires = transformedStagiaires;
        this.stagiairesUpdated.next([...this.stagiaires]);
      });

  }
  getStagiaireUpdateListener() {
    return this.stagiairesUpdated.asObservable();
  }

  getStagiaireById(id: any) {
    return this.http.get<{
      idStagiaire: string;
      Nom: string;
      Prenom: string;
    }>('http://localhost:3000/stagiaire/' + id);
  }



  addStagiaire(idStagiaire: string,
    Nom: string,
    Prenom: string
  ) {
    const stagiaire: Stagiaire = {
      idStagiaire: idStagiaire,
      Nom: Nom,
      Prenom: Prenom
    };
    this.http
      .post<{ idStagiaire: string }>('http://localhost:3000/stagiaire', stagiaire)
      .subscribe(responseData => {
        const id = responseData.idStagiaire;
        stagiaire.idStagiaire = id;
        this.stagiaires.push(stagiaire);
        this.stagiairesUpdated.next([...this.stagiaires]);
      });
  }

  updateStagiaire( idStagiaire: string,
    Nom: string,
    Prenom: string) {
      const stagiaire: Stagiaire = {
        idStagiaire: idStagiaire,
        Nom: Nom,
        Prenom: Prenom
      };
    this.http
      .put('http://localhost:3000/stagiaire/' + idStagiaire, stagiaire)
      .subscribe(response => {
        const updatedStagiaires = [...this.stagiaires];
        const oldStagiairesIndex = updatedStagiaires.findIndex(p => p.idStagiaire === stagiaire.idStagiaire);
        updatedStagiaires[oldStagiairesIndex] = stagiaire;
        this.stagiaires = updatedStagiaires;
        this.stagiairesUpdated.next([...this.stagiaires]);
      });
  }

  deleteStagiaire(idStagiaire: string) {
    this.http.delete('http://localhost:3000/stagiaire/' + idStagiaire)
      .subscribe(() => {
        const updatedStagiaires = this.stagiaires.filter(stagiaire => stagiaire.idStagiaire !== idStagiaire);
        this.stagiaires = updatedStagiaires;
        this.stagiairesUpdated.next([...this.stagiaires]);
      });
  }




}




