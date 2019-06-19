import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpEventType,HttpHeaders } from '@angular/common/http';
import { Subject, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { StageGlobal } from '../models/stageGlobal.model';
import { EnibiensMonde } from '../models/enibiensMonde.model';
import { EnibiensParPays } from '../models/enibiensParPays.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ElevesService {


  private stages: StageGlobal[] = [];
  dataStages = new Array();
  private stagesUpdated = new Subject<StageGlobal[]>();
  private enibiensMonde : EnibiensMonde[] = [];
  private enibiensParPays : EnibiensParPays[] = [];
  private enibiensMondeUpdated  = new Subject<EnibiensMonde[]>();
  private enibiensParPaysUpdated  = new Subject<EnibiensParPays[]>();
  constructor(private http: HttpClient) {

  }


  getNombreStagesMonde() {
    this.http
      .get<{ enibiensMonde: any }>(
        'http://localhost:3000/getNombreStagesMonde'
      )
      .pipe(map((stageData) => {
        return stageData.enibiensMonde.map(stage => {
          return ({
                nomPays : stage.nomPays,
                nombre : stage.nombre,
          });
        });
      }))
      .subscribe(transformedStages => {
        this.enibiensMonde = transformedStages;
        this.enibiensMondeUpdated.next([...this.enibiensMonde]);

      });
  }

  getEnibiensParPays() {
    this.http
      .get<{ enibiensParPays: any }>(
        'http://localhost:3000/getEnibiensParPays'
      )
      .pipe(map((stageData) => {
        return stageData.enibiensParPays.map(stage => {
          return ({
                nomPays : stage.nomPays,
                nombre : stage.nombre,

        
          });
        });
      }))
      .subscribe(transformedStages => {
        this.enibiensParPays = transformedStages;
        this.enibiensParPaysUpdated.next([...this.enibiensParPays]);

      });
  }




  getEnibiensMondeListener() {
    return this.enibiensMondeUpdated.asObservable();
  }

  getEnibiensParPaysListener() {
    return this.enibiensParPaysUpdated.asObservable();
  }


}
