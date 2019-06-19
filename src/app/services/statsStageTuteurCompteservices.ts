import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { StatsStageTuteurCompte } from '../models/statsStageTuteurCompte';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class statsStageTuteurCompteservices {


  private statsTuteurs: StatsStageTuteurCompte[] = [];
  // private stagesP: Stage[] = [];
  dataStages = new Array();
  private stagesUpdated = new Subject<StatsStageTuteurCompte[]>();
  // private stagesUpdatedP = new Subject<Stage[]>();
  constructor(private http: HttpClient) {

    /*this.getJSON().subscribe(data => {
      this.dataStages = data;
      // console.log('dataaaaaaaaaaaaaaaaaaaaaaaaaa', this.dataStages);
    });*/
  }



  getStatsTuteurs() {
    this.http
      .get<{ tuteurs: any }>(
        'http://localhost:3000/statsStageTuteurCompte'
      )
      .pipe(map((stageData) => {
        return stageData.tuteurs.map(stage => {
          return ({
            NomTuteur: stage.NomTuteur,
            PrenomTuteur: stage.PrenomTuteur,
            nmbrStages: stage.nmbrStages,

          });
        });
      }))
      .subscribe(transformedStages => {
        this.statsTuteurs = transformedStages;
        this.stagesUpdated.next([...this.statsTuteurs]);
        console.log('STATS TUEEEEEEEEEERYUGAHDZAH', transformedStages);
      });
    //console.log('tuteur', this.statsTuteurs);
  }

  getStatsUpdateListener() {
    return this.stagesUpdated.asObservable();
  }


}
