import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { StagiairesService } from '../../services/stagiaires.service';
import { Stagiaire } from '../../models/stagiaire.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';
import {Router} from '@angular/router';




@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    animations: [routerTransition()]
})
export class DashboardComponent implements OnInit {
    public alerts: Array<any> = [];
    public sliders: Array<any> = [];
    stagiaires: Stagiaire[] = [];
    private idStagiaire: 'm6hichri';
    _satagiaire: Stagiaire = null;
    private stagiaireSub: Subscription;


    // Récupérer ici toutes les informations sur les stages
   /*  stages = [

        {

            prenom: 'eazea',
            nom: 'aeae',
            ville: 'Paris',
            pays: "France",
            semestre: "S10",
            spec: "Informatique",
            entreprise: "Arinfo",
            pdf: "https://nuxeo.enib.fr/nuxeo/nxdoc/default/5a424b06-a846-49ad-9106-b29d6b285f1f/view_documents"

        },
        {

            prenom: 'test',
            nom: 'afaf',
            ville: "Paris",
            pays: "France",
            semestre: "S10",
            spec: "Informatique",
            entreprise: "Arinfo"

        },
        {

            prenom: 'test',
            nom: 'afaf',
            ville: "Paris",
            pays: "France",
            semestre: "S10",
            spec: "Informatique",
            entreprise: "Arinfo"

        },
        {

            prenom: 'blabla',
            nom: 'fdp',
            ville: "Paris",
            pays: "France",
            semestre: "S10",
            spec: "Informatique",
            entreprise: "Arinfo"

        },

        {

            prenom: 'heeeeeeey',
            nom: 'afaf',
            ville: "Paris",
            pays: "France",
            semestre: "S10",
            spec: "Informatique",
            entreprise: "Arinfo"

        },

    ];
 */
    constructor(public stagiairesService: StagiairesService,
        private _router: Router,
        private route: ActivatedRoute) {
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
        this.stagiairesService.getStagiaire();
        this.stagiaireSub = this.stagiairesService.getStagiaireUpdateListener()
        .subscribe((stagiaires: Stagiaire[]) => {
          this.stagiaires = stagiaires;
        });
        setTimeout(() => console.log('test stagiaire', this.stagiaires ), 1000);


        this.stagiairesService.getStagiaireById(this.idStagiaire).subscribe(appli => {
            this._satagiaire = {
              idStagiaire: appli.idStagiaire,
              Nom: appli.Nom,
              Prenom: appli.Nom,
            };
            console.log('getStagiaireById :', this._satagiaire);
          });

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
