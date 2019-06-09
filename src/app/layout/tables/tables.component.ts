import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { GlobalStageService } from '../../services/global-stage.service';
import { StageGlobal } from '../../models/stageGlobal.model';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-tables',
    templateUrl: './tables.component.html',
    styleUrls: ['./tables.component.scss'],
    animations: [routerTransition()]
})
export class TablesComponent implements OnInit {


/* stageGlobel */
private stageGSub: Subscription;
stagesG: StageGlobal[] = [];  

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

    constructor(public globalStageService: GlobalStageService){}

    ngOnInit() {
      
      /* get global stage */
      this.globalStageService.getStageG();
      this.stageGSub = this.globalStageService.getStageUpdateListener()
          .subscribe((stagesG: StageGlobal[]) => {
              this.stagesG = stagesG;
          });

      setTimeout(() => console.log('get global stage', this.stagesG), 2000);


    }
    
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
