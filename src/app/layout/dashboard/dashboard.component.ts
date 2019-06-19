import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';

import { GlobalStageService } from '../../services/global-stage.service';
import { StageGlobal } from '../../models/stageGlobal.model';
import { Subscription } from 'rxjs';
@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    animations: [routerTransition()]
})


export class DashboardComponent implements OnInit {
    public alerts: Array<any> = [];
    public sliders: Array<any> = [];

    value : string = "";

    /* stageGlobal */
    private stageGSub: Subscription;
    stagesG: StageGlobal[] = [];

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

    public closeAlert(alert: any) {
        const index: number = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    }    

    hideShow() {


        var divs = document.getElementsByName("input");
        for(var i=0, len=divs.length;i < len; i++){
            if (divs[i].style.display === "none") {
                divs[i].style.display = "block";
              } else {
                divs[i].style.display = "none";
              }
        }

      }
    
    filtreName() {

        (<HTMLInputElement>document.getElementById('input')).addEventListener('keyup', function(e) {
            var recherche = this.value.toLowerCase();
            var documents = document.querySelectorAll('.displayTable');
           
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

    // getLien(stage){
    //     return "https://nuxeo.enib.fr/nuxeo/nxpath/default/default-domain/workspaces/RE-Stagesetcontrats/Nouveaudossier/Nouveaudossier/"+stage.NomStagiaire.replace(" ","")+"_"+stage.PrenomStagiaire+stage.libelleSemestre+"2018@view_documents"
    //   }

    getLien(stage){
        return "https://nuxeo.enib.fr/nuxeo/nxpath/default/Enseignement/workspaces/PRI/2018-2019/Automne/Stages/fiches_synthese/HERRY_THOMAS_2018P_FS@view_documents?fbclid=IwAR2B0Uj0HOxESwpYDNGq-HyhnFpDd8EqTLcnB14ohm2XBxE_aT-PH9cMpow";
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


