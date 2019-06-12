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
 }


  public getJSON(): Observable<any> {
    return this.http.get('../../assets/data.json');
  }

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
