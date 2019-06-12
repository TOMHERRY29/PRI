import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpEventType,HttpHeaders } from '@angular/common/http';
import { Subject, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { StageGlobal } from '../models/stageGlobal.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {


  private stages: StageGlobal[] = [];
  // private stagesP: Stage[] = [];
  dataStages = new Array();
  private stagesUpdated = new Subject<StageGlobal[]>();
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




}
