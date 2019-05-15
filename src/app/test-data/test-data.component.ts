import { Component, OnInit } from '@angular/core';
import {StagiairesService} from '../services/stagiaires.service';
import {Stagiaire} from '../models/stagiaire.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-test-data',
  templateUrl: './test-data.component.html',
  styleUrls: ['./test-data.component.scss']
})
export class TestDataComponent implements OnInit {
stagiaires: Stagiaire[] = [];
private stagiaireSub: Subscription;

  constructor(public stagiairesService: StagiairesService ) {


   }

  ngOnInit() {
    this.stagiairesService.getStagiaire();
    this.stagiaireSub = this.stagiairesService.getStagiaireUpdateListener()
    .subscribe((stagiaires: Stagiaire[]) => {
      this.stagiaires = stagiaires;
    });
    console.log('test stagiaire', this.stagiaires );
  }


}
