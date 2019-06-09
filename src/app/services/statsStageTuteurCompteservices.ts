import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { statsStageTuteurCompte } from '../models/statsStageTuteurCompte';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class statsStageTuteurCompteservices {


  private stages: statsStageTuteurCompte[] = [];
  // private stagesP: Stage[] = [];
  dataStages = new Array();
  private stagesUpdated = new Subject<statsStageTuteurCompte[]>();
  // private stagesUpdatedP = new Subject<Stage[]>();
  constructor(private http: HttpClient) {

    /*this.getJSON().subscribe(data => {
      this.dataStages = data;
      // console.log('dataaaaaaaaaaaaaaaaaaaaaaaaaa', this.dataStages);
    });*/
  }




  /*addStageG(
    nomStagiaire: string,
    prenomStagiaire: string,
    libelleSemestre: string,
    addrStage: string,
    nomEntreprise: string,
    nomVille: string,
    nomPays: string,
    sujetStage: string,
    soutenanceSemaine: Number,
    DATES_STAGE: string,
    periodesStage: string
  ) {
    const stage: StageGlobal = {
      idStage: null,
      nomStagiaire: Nom,
      prenomStagiaire: prenomStagiaire,
      libelleSemestre: libelleSemestre,
      addrStage: addrStage,
      nomEntreprise: nomEntreprise,
      nomVille: nomVille,
      nomPays: nomPays,
      sujetStage: sujetStage,
      soutenanceSemaine: soutenanceSemaine,
      DATES_STAGES: DATES_STAGE,
      periodesStage: periodesStage
    };
    this.http
      .post<{ idStage: string }>('http://localhost:3000/importStages', stage)
      .subscribe(responseData => {
        const id = responseData.idStage;
        stage.idStage = id;
        this.stages.push(stage);
        this.stagesUpdated.next([...this.stages]);
      });
  }*/


  getStageG() {
    this.http
      .get<{ stages: any }>(
        'http://localhost:3000/importStages'
      )
      .pipe(map((stageData) => {
        console.log(stageData.stages);
        return stageData.stages.map(stage => {
          console.log(stage)
          return ({
            NomStagiaire: stage.NomStagiaire,
            PrenomStagiaire: stage.PrenomStagiaire,
            libelleSemestre: stage.libelleSemestre,
            addrStage: stage.addrStage,
            nomEntreprise: stage.nomEntreprise,
            nomVille: stage.nomVille,
            nomPays: stage.nomPays,
            sujetStage: stage.sujetStage,
            soutenanceSemaine: stage.soutenanceSemaine,
            idStage: stage.idStage,
            periodesStage: stage.periodesStage
          });
        });
      }))
      .subscribe(transformedStages => {
        this.stages = transformedStages;
        this.stagesUpdated.next([...this.stages]);
        console.log('transformedStages', transformedStages);
      });
    console.log('this.stages 2', this.stages);
  }

  getStageUpdateListener() {
    return this.stagesUpdated.asObservable();
  }

}
