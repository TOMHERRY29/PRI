import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpEventType,HttpHeaders } from '@angular/common/http';
import { Subject, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { StageGlobal } from '../models/stageGlobal.model';
import { StatsTuteursAffecte } from '../models/statsTuteursAffecte';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {


  private stages: StageGlobal[] = [];
  private statsStageSuivis: StatsTuteursAffecte[] = [];
  // private stagesP: Stage[] = [];
  dataStages = new Array();
  private stagesUpdated = new Subject<StageGlobal[]>();
  private statsStagesSuiviUpdated = new Subject<StatsTuteursAffecte[]>();
  //public result = new Re
  constructor(private http: HttpClient) {

  }


   setAjoutStageExcel(jsonObject:JSON){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
     this.http.post<JSON>('http://localhost:3000/importStages',jsonObject,httpOptions)
      .subscribe(event => {  
        console.log('done')
        console.log("event : "+event)
          
          return true;
        }, err => {
          console.log(err)
          return false;
        }
      )
      
  }


  getStats() {
    this.http
      .get<{ statsStageSuivis: any }>(
        'http://localhost:3000/statsStageSuivi'
      )
      .pipe(map((stageData) => {
        return stageData.statsStageSuivis.map(stage => {
          return ({
            stageA: stage.stageA,
            stageNA: stage.stageNA
        
          });
        });
      }))
      .subscribe(transformedStages => {
        this.statsStageSuivis = transformedStages;
        this.statsStagesSuiviUpdated.next([...this.statsStageSuivis]);

      });
  }




  getStatsUpdateListener() {
    return this.statsStagesSuiviUpdated.asObservable();
  }




}
