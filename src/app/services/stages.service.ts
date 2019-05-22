import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { StageGlobal } from '../models/stageGlobal.model';

@Injectable({
  providedIn: 'root'
})
export class StagesService {

  private stages: StageGlobal[] = [];
  private stagesUpdated = new Subject<StageGlobal[]>();
  constructor(private http: HttpClient) { }

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
}
