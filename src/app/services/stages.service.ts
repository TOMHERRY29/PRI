import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { StageGlobal } from '../models/stageGlobal.model';
import { Stage } from '../models/stage.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StagesService {

  private stages: StageGlobal[] = [];
  private stagesP: Stage[] = [];
  dataStages = new Array();
  private stagesUpdated = new Subject<StageGlobal[]>();
  private stagesUpdatedP = new Subject<Stage[]>();
  constructor(private http: HttpClient) {

    this.getJSON().subscribe(data => {
      this.dataStages = data;
      // console.log('dataaaaaaaaaaaaaaaaaaaaaaaaaa', this.dataStages);
    });
  }


  public getJSON(): Observable<any> {
    return this.http.get('../../assets/data.json');
  }


  addStage(
    idStage: string,
    sujetStage: string,
    addrStage: string,
    soutenanceSemaine: Number,
    nomTuteur: string,
    prenomTuteur: string,
    nomStagiaire: string,
    prenomStagiaire: string,
    libelleSemestre: string,
    nomVille: string,
    nomPays: string,
    nomEntreprise: string,
  ) {
    const stage: StageGlobal = {
      idStage: idStage,
      sujetStage: sujetStage,
      addrStage: addrStage,
      soutenanceSemaine: soutenanceSemaine,
      nomTuteur: nomTuteur,
      prenomTuteur: prenomTuteur,
      nomStagiaire: nomStagiaire,
      prenomStagiaire: prenomStagiaire,
      libelleSemestre: libelleSemestre,
      nomVille: nomVille,
      nomPays: nomPays,
      nomEntreprise: nomEntreprise,
    };
    this.http
      .post<{ idStage: string }>('http://localhost:3000/stages', stage)
      .subscribe(responseData => {
        const id = responseData.idStage;
        this.stages.push(stage);
        this.stagesUpdated.next([...this.stages]);
      });
  }




  getStage() {
    this.http
      .get<{ stages: any }>(
        'http://localhost:3000/stages'
      )
      .pipe(map((stageData) => {
        return stageData.stages.map(stage => {
          return {
            idStage: stage.idStage,
            sujetStage: stage.sujetStage,
            addrStage: stage.addrStage,
            soutenanceSemaine: stage.soutenanceSemaine,
            nomTuteur: stage.nomTuteur,
            prenomTuteur: stage.prenomTuteur,
            nomStagiaire: stage.nomStagiaire,
            prenomStagiaire: stage.prenomStagiaire,
            libelleSemestre: stage.libelleSemestre,
            nomVille: stage.nomVille,
            nomPays: stage.nomPays,
            nomEntreprise: stage.nomEntreprise
          };
        });
      }))
      .subscribe(transformedStages => {
        this.stages = transformedStages;
        this.stagesUpdated.next([...this.stages]);
      });

  }

  getStageUpdateListener() {
    return this.stagesUpdated.asObservable();
  }
  getStageUpdateListenerp() {
    return this.stagesUpdatedP.asObservable();
  }
}
