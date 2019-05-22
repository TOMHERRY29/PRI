import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';



@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    animations: [routerTransition()]
})


export class DashboardComponent implements OnInit {
    public alerts: Array<any> = [];
    public sliders: Array<any> = [];

    test : string = "TEST";
    value : string = "";
    searchText;


    //Récupérer ici toutes les informations sur les stages
    stages = [

        {
          
          prenom: 'eazea',
          nom: 'aeae',
          ville: "Lyon",
          pays: "France",
          semestre: "S10",
          spec: "Informatique",
          entreprise: "Arinfo",
          pdf: "https://nuxeo.enib.fr/nuxeo/nxdoc/default/5a424b06-a846-49ad-9106-b29d6b285f1f/view_documents",
          visible: 1
    
        },
        {
          
            prenom: 'test',
            nom: 'afaf',
            ville: "Marseille",
            pays: "France",
            semestre: "S09",
            spec: "Informatique",
            entreprise: "Arinfo",
            visible: 1
      
          },
          {
          
            prenom: 'test',
            nom: 'afaf',
            ville: "Paris",
            pays: "France",
            semestre: "S08",
            spec: "Electronique",
            entreprise: "Arinfo",
            visible: 1
      
          },
          {
          
            prenom: 'blabla',
            nom: 'fdp',
            ville: "Londres",
            pays: "Angleterre",
            semestre: "S10",
            spec: "Informatique",
            entreprise: "Arinfo",
            visible: 1
      
          },
          {
          
            prenom: 'heeeeeeey',
            nom: 'afaf',
            ville: "Paris",
            pays: "France",
            semestre: "S10",
            spec: "Informatique",
            entreprise: "Sopra Steria",
            visible: 1
      
          },
    
      ];

      stagesFiltered = this.stages;


      constructor() {

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

    ngOnInit() {}

    public closeAlert(alert: any) {
        const index: number = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    }    

    onKey() {
        this.filtreName();
      }
    
   // requete: string = (<HTMLInputElement>document.getElementById("prenomInput")).value;
    filtreName() {

        var requete = (<HTMLInputElement>document.getElementById("prenomInput")).value;
        var requete2 = (<HTMLInputElement>document.getElementById("nomInput")).value;
        var requete3 = (<HTMLInputElement>document.getElementById("myBrowser")).value;
        var requete4 = (<HTMLInputElement>document.getElementById("myBrowserPays")).value;
        var requete5 = (<HTMLInputElement>document.getElementById("myBrowserSemestre")).value;
        var requete6 = (<HTMLInputElement>document.getElementById("myBrowserSpeciality")).value;
        var requete7 = (<HTMLInputElement>document.getElementById("myBrowserEntreprise")).value;

        this.stagesFiltered = [];

        if(requete != '' || requete2 != '' 
        || requete3 != '' || requete4 != ''
        || requete5 != '' || requete6 != ''
        || requete7 != '')
        {
            for(let i = 0; i < this.stages.length; i++)
            {    
                if(this.stages[i].prenom == requete){
                    this.stagesFiltered.push(this.stages[i]);
                }
                if(this.stages[i].nom == requete2){
                    this.stagesFiltered.push(this.stages[i]);
                }
                if(this.stages[i].ville == requete3){
                    this.stagesFiltered.push(this.stages[i]);
                }
                if(this.stages[i].pays== requete4){
                    this.stagesFiltered.push(this.stages[i]);
                }
                if(this.stages[i].semestre== requete5){
                    this.stagesFiltered.push(this.stages[i]);
                }
                if(this.stages[i].spec== requete6){
                    this.stagesFiltered.push(this.stages[i]);
                }
                if(this.stages[i].entreprise== requete7){
                    this.stagesFiltered.push(this.stages[i]);
                }
            }
        }

        else{
            this.stagesFiltered = this.stages;
        }

    }

    isVisible(visible) {
        if(visible == 1)
        {
            return true;
        }

        else{
            return false;
        }
    }
    

 }   


