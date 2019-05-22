import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Periode } from '../models/periode.model';

@Injectable({
  providedIn: 'root'
})
export class PeriodesService {

  private periodes: Periode[] = [];

  private periodesUpdated = new Subject<Periode[]>();
  private periodeStatusListener = new Subject<boolean>();
  constructor(private http: HttpClient) { }

  getPeriode() {
    this.http
      .get<{ periodes: any }>(
        'http://localhost:3000/periode'
      )
      .pipe(map((periodeData) => {
        return periodeData.periodes.map(periode => {
          return {
            idPeriode: periode.idPeriode,
            dateDebut: periode.dateDebut,
            dateFin: periode.dateFin,
            idStage: periode.idStage
          };
        });
      }))
      .subscribe(transformedPeriode => {
        console.log('get periode', transformedPeriode);
        this.periodes = transformedPeriode;
        this.periodesUpdated.next([...this.periodes]);
      });

  }
  getPeriodeUpdateListener() {
    return this.periodesUpdated.asObservable();
  }

  getPeriodeById(id: any) {
    return this.http.get<{
      idPeriode: string;
      dateDebut: string;
      dateFin: Date;
      idStage: string;
    }>('http://localhost:3000/periode/' + id);
  }



  addPeriode(idPeriode: string,
    dateDebut: string,
    dateFin: Date,
    idStage: string
  ) {
    const periode: Periode = {
      idPeriode: idPeriode,
      dateDebut: dateDebut,
      dateFin: dateFin,
      idStage: idStage
    };
    this.http
      .post<{ idPeriode: string }>('http://localhost:3000/periode', periode)
      .subscribe(responseData => {
        const id = responseData.idPeriode;
        periode.idPeriode = id;
        this.periodes.push(periode);
        this.periodesUpdated.next([...this.periodes]);
      });
  }

  updatePeriode(idPeriode: string,
    dateDebut: string,
    dateFin: Date,
    idStage: string
  ) {
    const periode: Periode = {
      idPeriode: idPeriode,
      dateDebut: dateDebut,
      dateFin: dateFin,
      idStage: idStage
    };
    this.http
      .put('http://localhost:3000/periode/' + idPeriode, periode)
      .subscribe(response => {
        const updatedPeriodes = [...this.periodes];
        const oldPeriodesIndex = updatedPeriodes.findIndex(p => p.idPeriode === periode.idPeriode);
        updatedPeriodes[oldPeriodesIndex] = periode;
        this.periodes = updatedPeriodes;
        this.periodesUpdated.next([...this.periodes]);
      });
  }

  deletePeriode(idPeriode: string) {
    this.http.delete('http://localhost:3000/periode/' + idPeriode)
      .subscribe(() => {
        const updatedPeriodes = this.periodes.filter(periode => periode.idPeriode !== idPeriode);
        this.periodes = updatedPeriodes;
        this.periodesUpdated.next([...this.periodes]);
      });
  }



}
