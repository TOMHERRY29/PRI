import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpEventType,HttpHeaders } from '@angular/common/http';
import { Subject, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { Campagne } from '../models/campagne.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CampagneService {


  private campagnes: Campagne[] = [];
  // private stagesP: Stage[] = [];
  dataStages = new Array();
  private campagneUpdated = new Subject<Campagne[]>();
  // private stagesUpdatedP = new Subject<Stage[]>();
  constructor(private http: HttpClient) {
 }


  getCampagne() {
    this.http
      .get<{ campagnes: any }>(
        'http://localhost:3000/stageCompagneNonAffecte'
      )
      .pipe(map((stageData) => {
        console.log(stageData.campagnes);
        return stageData.campagnes.map(campagne => {
          console.log(campagne)
          return ({
            NomStagiaire: campagne.NomStagiaire,
            PrenomStagiaire: campagne.PrenomStagiaire,
            libelleSemestre: campagne.libelleSemestre,
            addrStage: campagne.addrStage,
            nomEntreprise: campagne.nomEntreprise,
            nomVille: campagne.nomVille,
            nomPays: campagne.nomPays,
            sujetStage: campagne.sujetStage,
            soutenanceSemaine: campagne.soutenanceSemaine,
            idStage: campagne.id,
            periodesStage: campagne.periodesStage,
            semestre: campagne.libelleSemestre,
            checked: false,
            commentaire: '',
            isCollapsed: false
          });
        });
      }))
      .subscribe(tranformedcampagnes => {
        this.campagnes = tranformedcampagnes;
        this.campagneUpdated.next([...this.campagnes]);
        console.log('transformedStages', tranformedcampagnes);
      });
    console.log('this.stages 2', this.campagnes);
  }

  getCampagneUpdateListener() {
    return this.campagneUpdated.asObservable();
  }

  
  setAffectationStages(varObject){
    var o = [] // empty Object
    for(var i=0;i<varObject.length;i=i+3){
      var data = {
        "idStage":varObject[i],
        "commentaire":varObject[i+1],
        "mail":varObject[i+2]
      };
      o.push(data);
    }
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
      console.log("objet o : "+JSON.stringify(o));
     this.http.post<JSON>('http://localhost:3000/stageCompagne',JSON.stringify(o),httpOptions)
      .subscribe(event => {  
        console.log('done')
        console.log("event : "+event)
          
          
          /*for (var key in obj){
              var attrName = key;
              var attrValue = obj[0];
              console.log(attrValue)
              console.log(key)
          }*/
          return true;
        }, err => {
          console.log(err)
          return false;
        }
      )
      
  }

}
