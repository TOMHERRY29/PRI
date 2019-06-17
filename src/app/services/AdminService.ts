import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpEventType,HttpHeaders } from '@angular/common/http';
import { Subject, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AdminModelAffectation } from '../models/AdminModelAffectation.model';




@Injectable({
  providedIn: 'root'
})
export class AdminService {


  private stages: AdminModelAffectation[] = [];
  // private stagesP: Stage[] = [];
  dataStages = new Array();
  private stagesUpdated = new Subject<AdminModelAffectation[]>();
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

  getCampagne() {
    this.http
      .get<{ campagnes: any }>(
        'http://localhost:3000/stageCompagneNonAffecteValidation'
      )
      .pipe(map((stageData) => {
        console.log(stageData.campagnes);
        return stageData.campagnes.map(campagne => {
          console.log(campagne)
          return ({
              id: campagne.id,
              NomStagiaire: campagne.NomStagiaire,
              PrenomStagiaire: campagne.PrenomStagiaire,
              sujetStage: campagne.sujetStage,
              libelleSemestre: campagne.libelleSemestre,
              tuteurId: campagne.tuteurId,
              NomTuteur: campagne.NomTuteur,
              PrenomTuteur: campagne.PrenomTuteur,
              commentaire: campagne.commentaire,
              nmbreStage: campagne.nmbreStage
          });
        });
      }))
      .subscribe(tranformedcampagnes => {
        this.stages = tranformedcampagnes;
        this.stagesUpdated.next([...this.stages]);
        console.log('transformedStages', tranformedcampagnes);
      });
    console.log('this.stages 3', this.stages);
  }

  getCampagneUpdateListener() {
    return this.stagesUpdated.asObservable();
  }

  setStageTuteurAffecte(checkedList){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    var jsonObject=JSON.stringify({"idStage":checkedList[0],"idTuteur":checkedList[1]})
    console.log("jsonObject "+jsonObject);
     this.http.post<JSON>('http://localhost:3000/stageCompagneNonAffecteValidation',jsonObject,httpOptions)
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



}
