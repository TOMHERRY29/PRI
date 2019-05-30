import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { StageGlobal } from '../models/stageGlobal.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalStageService {


  private stages: StageGlobal[] = [];
  // private stagesP: Stage[] = [];
  dataStages = new Array();
  private stagesUpdated = new Subject<StageGlobal[]>();
  // private stagesUpdatedP = new Subject<Stage[]>();
  constructor(private http: HttpClient) {

    this.getJSON().subscribe(data => {
      this.dataStages = data;
      // console.log('dataaaaaaaaaaaaaaaaaaaaaaaaaa', this.dataStages);
    });
  }


  public getJSON(): Observable<any> {
    return this.http.get('../../assets/data.json');
  }


  addStageG(
    nomStagiaire: string,
    prenomStagiaire: string,
    libelleSemestre: string,
    addrStage: string,
    nomEntreprise: string,
    nomVille: string,
    nomPays: string,
    sujetStage: string,
    soutenanceSemaine: Number,
  ) {
    const stage: StageGlobal = {
      id: null,
      nomStagiaire: nomStagiaire,
      prenomStagiaire: prenomStagiaire,
      libelleSemestre: libelleSemestre,
      addrStage: addrStage,
      nomEntreprise: nomEntreprise,
      nomVille: nomVille,
      nomPays: nomPays,
      sujetStage: sujetStage,
      soutenanceSemaine: soutenanceSemaine,
    };
    this.http
      .post<{ idStage: string }>('http://localhost:3000/globalStage', stage)
      .subscribe(responseData => {
        const id = responseData.idStage;
        stage.id = id;
        this.stages.push(stage);
        this.stagesUpdated.next([...this.stages]);
      });
  }




  getStageG() {
    this.http
      .get<{ stages: any }>(
        'http://localhost:3000/globalStage'
      )
      .pipe(map((stageData) => {
        return stageData.stages.map(stage => {
          return {
            nomStagiaire: stage.nomStagiaire,
            prenomStagiaire: stage.prenomStagiaire,
            libelleSemestre: stage.libelleSemestre,
            addrStage: stage.addrStage,
            nomEntreprise: stage.nomEntreprise,
            nomVille: stage.nomVille,
            nomPays: stage.nomPays,
            sujetStage: stage.sujetStage,
            soutenanceSemaine: stage.soutenanceSemaine,
            id: stage.id,
          };
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
