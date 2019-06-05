import { Component, OnInit, ViewChild, ElementRef, VERSION } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { $ } from 'protractor';
@Component({
  selector: 'app-campagne',
  templateUrl: './campagne.component.html',
  styleUrls: ['./campagne.component.scss'],
  animations: [routerTransition()]
})

export class CampagneComponent implements OnInit {



//Récupérer ici toutes les informations sur les entreprises
stages = [

  {
    
      id:1,
      nom: 'Jean',
      prenom: 'Dupont',
      sujet: "Travaille en tant que développeur web-mobile.",
      checked:false,
      Name:"name",
      Commentaire:""

  }
  // {
    
  //   nom: 'Sarah',
  //   prenom: 'Lais',
  //   sujet: "Travaille en tant que programmateur.",
  //   checked:false

  //   },
  //   {
    
  //     nom: 'Thomas',
  //     prenom: 'Lessi',
  //     sujet: "Travaille en tant qu'ingénieur et en méthode agile.",
  //     checked:false

  //   }
    
  ];

  stagesFiltered = this.stages;

  constructor() {}

  ngOnInit() {}
  
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

checkedList: any[] = [];

onCheckboxChange(option, event) {
  if(event.target.checked) {
    this.checkedList.push(option.sujet);
  }
  else {
  for(var i=0 ; i < this.stagesFiltered.length; i++) {
    if(this.checkedList[i] == option.sujet) {
      this.checkedList.splice(i,1);
   }
 }
}
console.log(this.checkedList);
}

editPartyRolesSubmit() {
  console.log(this.stagesFiltered);
}

}