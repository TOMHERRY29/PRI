import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import {Stagiaire} from '../models/stagiaire.model';

@Injectable({
  providedIn: 'root'})
export class StagiairesService {

  private stagiaires: Stagiaire[] = [];

  private stagiairesUpdated = new Subject<Stagiaire[]>();
  private stagiaireStatusListener = new Subject<boolean>();
  constructor(private http: HttpClient) { }

  getStagiaire() {
    this.http
    .get<{stagiaires: any }>(
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
  }>('http://localhost:3000/stagiaire' + id);
}


}




