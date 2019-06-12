import { Component, OnInit, ViewChild, ElementRef, VERSION } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { $ } from 'protractor';
import { HttpClient, HttpResponse, HttpEventType } from '@angular/common/http';
import { MatTableModule } from '@angular/material';

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
      Commentaire:"coucou",
      isCollapsed:false

  },
  {
    id:2,
    nom: 'Sarah',
    prenom: 'Lais',
    sujet: "Travaille en tant que programmateur.",
    checked:false,
    Name:"name",
    Commentaire:"une",
    isCollapsed:false

    },
    {
      id:3,
      nom: 'Thomas',
      prenom: 'Lessi',
      sujet: "Travaille en tant qu'ingénieur et en méthode agile.",
      checked:false,
      Name:"name",
      Commentaire:"aucun",
      isCollapsed:false

    }
    
  ];

  
  stagesFiltered = this.stages;
  constructor() {
   
  }

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
    this.checkedList.push(option.id);
    this.checkedList.push(option.Commentaire);
  }
  else {
  for(var i=0 ; i < this.stagesFiltered.length; i++) {
    if(this.checkedList[i] == option.id && this.checkedList[i+1] == option.Commentaire) {
      this.checkedList.splice(i,2);
   }
 }
}

console.log(this.checkedList);
}

onCheckboxChangeCom(option, event) {
  for(var i=0 ; i < this.stagesFiltered.length; i++) {
    if(this.checkedList[i] == option.id) {
    this.checkedList[i+1] = option.Commentaire;
    }
  }
}

editPartyRolesSubmit() {
  //console.log(this.stagesFiltered);
}

checkedEvnt(val) {
  for(let i =0;i < this.stagesFiltered.length;i++){
    this.stagesFiltered[i].checked = val;
    this.stagesFiltered[i].Commentaire = "";
  }
  this.checkedList = [];
  console.log(this.checkedList);
}

}