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


    ngOnInit() {}

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


