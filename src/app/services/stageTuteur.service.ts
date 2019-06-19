import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { StageTuteur } from '../models/stageTuteur.model';
import { StageGlobal } from '../models/stageGlobal.model';

@Injectable({
  providedIn: 'root'
})
export class StageTuteurService {

  private stageTuteur: StageTuteur[] = [];
  private stageTuteurUpdated = new Subject<StageTuteur[]>();
  private stagiaireStatusListener = new Subject<boolean>();
  constructor(private http: HttpClient) { }



  getStageTuteur() {
    this.http
      .get<{ stageTuteur: any }>(
        'http://localhost:3000/stagiaires'
      )
      .pipe(map((stagiaireData) => {
        return stagiaireData.stageTuteur.map(stagiaire => {
          return {
            Nom: stagiaire.Nom,
            Prenom: stagiaire.Prenom,
            idStagiaire: stagiaire.idStagiaire
          };
        });
      }))
      .subscribe(transformedStagiaires => {
        this.stageTuteur = transformedStagiaires;
        this.stageTuteurUpdated.next([...this.stageTuteur]);
      });
      console.log('stageTuteur services',  this.stageTuteur);

  }
  getStageTuteurUpdateListener() {
    return this.stageTuteurUpdated.asObservable();
  }

  getStageTuteurById(id: any) {
    return this.http.get<{
        idStageTuteur: string;
        idStagiaire: string;
        idTuteur: string;
        commentaire: string;
        valide: boolean;
    }>('http://localhost:3000/stagiaires/' + id);
  }



  addStageTuteur(idStageTuteur: string,
    idStagiaire: string,
    idTuteur: string,
    commentaire: string,
    valide: boolean
  ) {
    const stageTuteur: StageTuteur = {
        idStageTuteur: idStageTuteur,
        idStagiaire: idStagiaire,
        idTuteur: idTuteur,
        commentaire: commentaire,
        valide: valide
    };
    this.http
      .post<{ idStageTuteur: string }>('http://localhost:3000/stagiaires', stageTuteur)
      .subscribe(responseData => {
        const id = responseData.idStageTuteur;
        stageTuteur.idStageTuteur = id;
        this.stageTuteur.push(stageTuteur);
        this.stageTuteurUpdated.next([...this.stageTuteur]);
      });
  }

  updateStagiaire(idStageTuteur: string,
    idStagiaire: string,
    idTuteur: string,
    commentaire: string,
    valide: boolean) {
        const stageTuteur: StageTuteur = {
            idStageTuteur: idStageTuteur,
            idStagiaire: idStagiaire,
            idTuteur: idTuteur,
            commentaire: commentaire,
            valide: valide
        };
    this.http
      .put('http://localhost:3000/stagiaires/' + idStagiaire, stageTuteur)
      .subscribe(response => {
        const updatedStageTuteur = [...this.stageTuteur];
        const oldStagiairesIndex = updatedStageTuteur.findIndex(p => p.idStagiaire === stageTuteur.idStageTuteur);
        updatedStageTuteur[oldStagiairesIndex] = stageTuteur;
        this.stageTuteur = updatedStageTuteur;
        this.stageTuteurUpdated.next([...this.stageTuteur]);
      });
  }

  deleteStageTuteur(idStageTuteur: string) {
    this.http.delete('http://localhost:3000/stagiaires/' + idStageTuteur)
      .subscribe(() => {
        const updatedStageTuteur = this.stageTuteur.filter(stageTuteur => stageTuteur.idStageTuteur !== idStageTuteur);
        this.stageTuteur = updatedStageTuteur;
        this.stageTuteurUpdated.next([...this.stageTuteur]);
      });
  }




}




