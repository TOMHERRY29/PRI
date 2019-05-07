import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';

@Component({
    selector: 'app-tables',
    templateUrl: './tables.component.html',
    styleUrls: ['./tables.component.scss'],
    animations: [routerTransition()]
})
export class TablesComponent implements OnInit {

//Récupérer ici toutes les informations sur les stages
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
        pays: 'France',
        ville: "Nantes"
  
      }
      
    ];

    constructor() {}

    ngOnInit() {}
}
