import { Component, OnInit } from '@angular/core';
import { StagiairesService } from '../services/stagiaires.service';
import { Stagiaire } from '../models/stagiaire.model';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';

import { GlobalStageService } from '../services/global-stage.service';
import { StageGlobal } from '../models/stageGlobal.model';

import { StagesService } from '../services/stages.service';
import { Stage } from '../models/stage.model';
@Component({
  selector: 'app-test-data',
  templateUrl: './test-data.component.html',
  styleUrls: ['./test-data.component.scss']
})
export class TestDataComponent implements OnInit {
  stagiaires: Stagiaire[] = [];
  private stagiaireSub: Subscription;
  userForm: FormGroup;

  /* stageGlobel */
  private stageGSub: Subscription;
  stageG: StageGlobal[] = [];

  private dataStages = new Array();


  constructor(public stagiairesService: StagiairesService,
    public globalStageService: GlobalStageService,
    public stagesService: StagesService) {


  }

  ngOnInit() {
    this.stagesService.getJSON().subscribe((stages: Stage[]) => {
      this.dataStages = stages;
      console.log(' dashbord data 1 ', this.dataStages);
  });


  }

  private dataJson(): void {

    for (let i = 0; i < this.dataStages.length; i++) {
        console.log('name**********', i);
        console.log(this.dataStages[i].nomStagiaire);
        this.globalStageService.addStageG(
            this.dataStages[i].nomStagiaire,
            this.dataStages[i].prenomStagiaire,
            this.dataStages[i].libelleSemestre,
            this.dataStages[i].addrStage,
            this.dataStages[i].nomEntreprise,
            this.dataStages[i].nomVille,
            this.dataStages[i].nomPays,
            this.dataStages[i].sujetStage,
            this.dataStages[i].soutenanceSemaine
      );
    }

    console.log(' fin for ');
}
  onAddNode(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.stagiairesService.addStagiaire(
      form.value.idStagiaire,
      form.value.Nom,
      form.value.Prenom
    );
  }
  // form.resetForm();
}




