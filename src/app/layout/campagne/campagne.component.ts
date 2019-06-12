import { Component, OnInit, ViewChild, ElementRef, VERSION } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { $ } from 'protractor';
import { CampagneService } from '../../services/campagne.service';
import { Campagne } from '../../models/campagne.model';
import { Subscription } from 'rxjs';
import { LoginService } from '../../services/login.service';
@Component({
  selector: 'app-campagne',
  templateUrl: './campagne.component.html',
  styleUrls: ['./campagne.component.scss'],
  animations: [routerTransition()]
})

export class CampagneComponent implements OnInit {


/* stageGlobel */
private campagneSub: Subscription;
stages: Campagne[] = [];
stagesFiltered = [];
private mail: String;
//Récupérer ici toutes les informations sur les entreprises
 
  constructor(public compagneService: CampagneService,private loginService: LoginService){}

  ngOnInit() {
    //this.stagesFiltered=this.stagess;
      /* get campagne stage */
      this.mail = this.loginService.mail_adress.email;
      this.compagneService.getCampagne();
      this.campagneSub = this.compagneService.getCampagneUpdateListener()
          .subscribe((stagesG: Campagne[]) => {
              this.stages = stagesG;
              this.stagesFiltered = stagesG;
              console.log(this.stages);
          });

      setTimeout(() => console.log('get global campagne : ', this.stages), 2000);
      setTimeout(() => this.stagesFiltered = this.stages,1000);
      setTimeout(() => console.log('get global campagne filtred : ', this.stagesFiltered), 2000);
      console.log(this.stages)
  }
  
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
    this.checkedList.push(option.idStage);
    this.checkedList.push(option.commentaire);
    this.checkedList.push(this.mail);
  }
  else {
  for(var i=0 ; i < this.stagesFiltered.length; i++) {
    if(this.checkedList[i] == option.idStage && this.checkedList[i+1] == option.commentaire) {
      this.checkedList.splice(i,3);
   }
 }
}

console.log(this.checkedList);
}

onCheckboxChangeCom(option, event) {
  for(var i=0 ; i < this.stagesFiltered.length; i++) {
    if(this.checkedList[i] == option.idStage) {
    this.checkedList[i+1] = option.commentaire;
    }
  }
}

editPartyRolesSubmit() {
  //console.log(this.stagesFiltered);
}

checkedEvnt(val) {
  for(let i =0;i < this.stagesFiltered.length;i++){
    this.stagesFiltered[i].checked = val;
    this.stagesFiltered[i].commentaire = "";
  }
  this.checkedList = [];
  console.log(this.checkedList);
}
  submitChoice(){
    this.compagneService.setAffectationStages(this.checkedList);
  }
}