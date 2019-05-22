import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';

@Component({
    selector: 'app-tables',
    templateUrl: './tables.component.html',
    styleUrls: ['./tables.component.scss'],
    animations: [routerTransition()]
})
export class TablesComponent implements OnInit {

//Récupérer ici toutes les informations sur les entreprises
entreprises = [

    {
      
        nom: 'Sopra Steria',
        pays: 'France',
        ville: "Brest"

    },
    {
      
        nom: 'SFR',
        pays: 'France',
        ville: "Lyon"
  
      },
      {
      
        nom: 'Capgemini',
        pays: 'Angleterre',
        ville: "Londres"
  
      }
      
    ];

    entrepriseFiltered = this.entreprises;

    constructor() {}

    ngOnInit() {}

    onKey() {
        this.filtreName();
      }
    
   // requete: string = (<HTMLInputElement>document.getElementById("prenomInput")).value;
    filtreName() {

        var requete = (<HTMLInputElement>document.getElementById("nomInput")).value;
        var requete2 = (<HTMLInputElement>document.getElementById("myBrowserPays")).value;
        var requete3 = (<HTMLInputElement>document.getElementById("myBrowser")).value;

        this.entrepriseFiltered = [];

        if(requete != '' || requete2 != '' 
        || requete3 != '')
        {
            for(let i = 0; i < this.entreprises.length; i++)
            {    
                
                if(this.entreprises[i].nom == requete){
                    this.entrepriseFiltered.push(this.entreprises[i]);
                }
                if(this.entreprises[i].pays == requete2){
                    this.entrepriseFiltered.push(this.entreprises[i]);
                }
                if(this.entreprises[i].ville== requete3){
                    this.entrepriseFiltered.push(this.entreprises[i]);
                }
            }
        }

        else{
            this.entrepriseFiltered = this.entreprises;
        }

    }
}
