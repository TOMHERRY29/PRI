import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Subscription } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Router } from '@angular/router';
import { StagiairesService } from '../../services/stagiaires.service';
import { Stagiaire } from '../../models/stagiaire.model';
import { EntreprisesService } from '../../services/entreprises.service';
import { Entreprise } from '../../models/entreprise.model';
import {StagesService} from '../../services/stages.service';
import { StageGlobal } from '../../models/stageGlobal.model';

import {PeriodesService} from '../../services/periodes.service';
import { Periode } from '../../models/periode.model';

import {PiecesjointesService} from '../../services/piecesjointes.service';
import { Piece } from '../../models/piecejointe.model';




@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    animations: [routerTransition()]
})
export class DashboardComponent implements OnInit {
    public alerts: Array<any> = [];
    public sliders: Array<any> = [];

    // ************My modifs***************** */
    stagiaires: Stagiaire[] = [];
    stages: StageGlobal[] = [] ;
    idStagiaire: 'm6hichri';
    _satagiaire: Stagiaire;
    private stagiaireSub: Subscription;
    private stageSub: Subscription;
    entreprises: Entreprise[] = [];
    _entreprise: Entreprise = null;
    private entrepriseSub: Subscription;

    private periodeSub: Subscription;
    private pieceSub: Subscription;
    periodes: Periode[] = [];
    pieces: Piece[] = [];




    // editForm: FormGroup;


    // Récupérer ici toutes les informations sur les stages
    constructor(public stagiairesService: StagiairesService,
        private _router: Router,
        private route: ActivatedRoute,
        public entreprisesService: EntreprisesService,
        public stagesService: StagesService,
        public periodeService: PeriodesService,
        public pieceService: PiecesjointesService) {
        this.sliders.push(
            {
                imagePath: 'assets/images/slider1.jpg',
                label: 'First slide label',
                text:
                    'Nulla vitae elit libero, a pharetra augue mollis interdum.'
            },
            {
                imagePath: 'assets/images/slider2.jpg',
                label: 'Second slide label',
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
            },
            {
                imagePath: 'assets/images/slider3.jpg',
                label: 'Third slide label',
                text:
                    'Praesent commodo cursus magna, vel scelerisque nisl consectetur.'
            }
        );

        this.alerts.push(
            {
                id: 1,
                type: 'success',
                message: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptates est animi quibusdam praesentium quam, et perspiciatis,
                consectetur velit culpa molestias dignissimos
                voluptatum veritatis quod aliquam! Rerum placeat necessitatibus, vitae dolorum`
            },
            {
                id: 2,
                type: 'warning',
                message: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptates est animi quibusdam praesentium quam, et perspiciatis,
                consectetur velit culpa molestias dignissimos
                voluptatum veritatis quod aliquam! Rerum placeat necessitatibus, vitae dolorum`
            }
        );
    }

    ngOnInit() {

        // ****************Get all Stagiaire ********************* */
        this.stagiairesService.getStagiaire();
        this.stagiaireSub = this.stagiairesService.getStagiaireUpdateListener()
            .subscribe((stagiaires: Stagiaire[]) => {
                this.stagiaires = stagiaires;
            });
        setTimeout(() => console.log('test stagiaire', this.stagiaires), 1000);

  // ****************Get all Stages ********************* */
        this.stagesService.getStage();
        this.stageSub = this.stagesService.getStageUpdateListener()
            .subscribe((stages: StageGlobal[]) => {
                this.stages = stages;
            });
        setTimeout(() => console.log('*************stage**************', this.stages), 1000);

// ****************Get all periode ********************* */
this.periodeService.getPeriode();
this.periodeSub = this.periodeService.getPeriodeUpdateListener()
    .subscribe((periodes: Periode[]) => {
        this.periodes = periodes;
    });
setTimeout(() => console.log('*************stage**************', this.periodes), 1000);


this.stagiairesService.getStagiaireById('h6rafaa').subscribe(appli => {
    console.log('test appli', appli);
    this._satagiaire = {
        idStagiaire: appli[0].idStagiaire,
        Nom: appli[0].Nom,
        Prenom: appli[0].Prenom
    };

});


        // ****************Get all Entreprise ********************* */
        this.entreprisesService.getEntreprises();
        this.entrepriseSub = this.entreprisesService.getStagiaireUpdateListener()
            .subscribe((entreprises: Entreprise[]) => {
                this.entreprises = entreprises;
            });
        setTimeout(() => console.log('test entreprises', this.entreprises), 1000);

        // **************Get by id ************** */
        this.stagiairesService.getStagiaireById('h6rafaa').subscribe(appli => {
            console.log('test appli', appli);
            this._satagiaire = {
                idStagiaire: appli[0].idStagiaire,
                Nom: appli[0].Nom,
                Prenom: appli[0].Prenom
            };

        });
        setTimeout(() => console.log('getStagiaireById 2:', this._satagiaire), 5000);
        /*   this.route.paramMap.subscribe((paramMap: ParamMap) => {
              if (paramMap.has('idStagiaire')) {
                this.idStagiaire = paramMap.get('idStagiaire');
                this.stagiairesService.getStagiaireById(this.idStagiaire).subscribe(appli => {
                  this._satagiaire = {
                    idStagiaire: appli.idStagiaire,
                    Nom: appli.Nom,
                    Prenom: appli.Nom,
                  };
                  console.log('getStagiaireById :', this._satagiaire);
                });
              } else {
                this.idStagiaire = null;
                console.log('the are a problem');
              }
            }); */
    }


    public closeAlert(alert: any) {
        const index: number = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    }

}
