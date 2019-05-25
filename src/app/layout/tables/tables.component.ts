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
    
   // requete: string = (<HTMLInputElement>document.getElementById("prenomInput")).value;
   filtreName() {

    (<HTMLInputElement>document.getElementById('input')).addEventListener('keyup', function(e) {
        var recherche = this.value.toLowerCase();
        var documents = document.querySelectorAll('.table');
       
        Array.prototype.forEach.call(documents, function(document) {
          // On a bien trouvé les termes de recherche.
          if (document.innerHTML.toLowerCase().indexOf(recherche) > -1) {
            document.style.display = "";
          } else {
              
            document.style.display = "none";
          }
        });
      });

}
}
