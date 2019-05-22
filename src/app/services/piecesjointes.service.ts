import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Piece } from '../models/piecejointe.model';

@Injectable({
  providedIn: 'root'
})
export class PiecesjointesService {

  private pieces: Piece[] = [];

  private piecesUpdated = new Subject<Piece[]>();
  private pieceStatusListener = new Subject<boolean>();
  constructor(private http: HttpClient) { }

  getPiece() {
    this.http
      .get<{ pieces: any }>(
        'http://localhost:3000/piecesjointes'
      )
      .pipe(map((pieceData) => {
        return pieceData.pieces.map(piece => {
          return {
            idPiecesJointes: piece.idPiecesJointes,
            titre: piece.titre,
            url: piece.url,
            idStage: piece.idStage
          };
        });
      }))
      .subscribe(transformedPiece => {
        console.log('get piece', transformedPiece);
        this.pieces = transformedPiece;
        this.piecesUpdated.next([...this.pieces]);
      });

  }
  getPeriodeUpdateListener() {
    return this.piecesUpdated.asObservable();
  }
}
