import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { Stagiaire } from '../models/stagiaire.model';
import { StageGlobal } from '../models/stageGlobal.model';

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
        'http://localhost:3000/stagiaires'
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
        this.stagiaires = transformedStagiaires;
        this.stagiairesUpdated.next([...this.stagiaires]);
      });
      console.log('stagiaire services',  this.stagiaires);

  }
  getStagiaireUpdateListener() {
    return this.stagiairesUpdated.asObservable();
  }

  getStagiaireById(id: any) {
    return this.http.get<{
      idStagiaire: string;
      Nom: string;
      Prenom: string;
    }>('http://localhost:3000/stagiaires/' + id);
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
      .post<{ idStagiaire: string }>('http://localhost:3000/stagiaires', stagiaire)
      .subscribe(responseData => {
        const id = responseData.idStagiaire;
        stagiaire.idStagiaire = id;
        this.stagiaires.push(stagiaire);
        this.stagiairesUpdated.next([...this.stagiaires]);
      });
  }

  updateStagiaire(idStagiaire: string,
    Nom: string,
    Prenom: string) {
    const stagiaire: Stagiaire = {
      idStagiaire: idStagiaire,
      Nom: Nom,
      Prenom: Prenom
    };
    this.http
      .put('http://localhost:3000/stagiaires/' + idStagiaire, stagiaire)
      .subscribe(response => {
        const updatedStagiaires = [...this.stagiaires];
        const oldStagiairesIndex = updatedStagiaires.findIndex(p => p.idStagiaire === stagiaire.idStagiaire);
        updatedStagiaires[oldStagiairesIndex] = stagiaire;
        this.stagiaires = updatedStagiaires;
        this.stagiairesUpdated.next([...this.stagiaires]);
      });
  }

  deleteStagiaire(idStagiaire: string) {
    this.http.delete('http://localhost:3000/stagiaires/' + idStagiaire)
      .subscribe(() => {
        const updatedStagiaires = this.stagiaires.filter(stagiaire => stagiaire.idStagiaire !== idStagiaire);
        this.stagiaires = updatedStagiaires;
        this.stagiairesUpdated.next([...this.stagiaires]);
      });
  }




}




