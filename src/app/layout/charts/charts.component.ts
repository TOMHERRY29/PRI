import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';

@Component({
    selector: 'app-charts',
    templateUrl: './charts.component.html',
    styleUrls: ['./charts.component.scss'],
    animations: [routerTransition()]
})
export class ChartsComponent implements OnInit {


    public show:boolean = true;
    public show_diag:boolean = false;
    public buttonName:any = 'Tableau';
    public buttonName2:any = 'Diagrammes';

    //Récupérer ici toutes les informations sur les stages
    eleves = [

        {
          
          prenom: 'eazea',
          nom: 'aeae',
          semestre: "S10",
          stageTrouve: "OUI",
          entreprise: "Arinfo",
          tuteur : "T. LE MAGUERESSE",
          visible: 1
    
        },
        {
          
            prenom: 'aaaa',
            nom: 'Coucou',
            semestre: "S10",
            stageTrouve: "OUI",
            entreprise: "Sopra Steria",
            tuteur : "T. LE MAGUERESSE",
            visible: 1
      
          },
        {
            prenom: 'test',
            nom: 'dupont',
            semestre: "S10",
            stageTrouve: "NON",
            entreprise: "Atos",
            tuteur : "C. CALVES",
            visible: 1
    
        },
    
      ];

      elevesFiltered = this.eleves;
    // bar chart
    public barChartOptions: any = {
        scaleShowVerticalLines: false,
        responsive: true
    };
    public barChartLabels: string[] = [
        'France',
        'Italie',
        'Canada',
        'Brésil',
        'Espagne',
        'Angleterre'
    ];
    public barChartType: string = 'bar';
    public barChartLegend: boolean = true;

    public barChartData: any[] = [
        { data: [65, 59, 80, 81, 56, 55, 40], label: 'Nombre de stagiaires' }
    ];

    // Doughnut
    public doughnutChartLabels: string[] = [
        'Étranger',
        'France'
    ];
    public doughnutChartData: number[] = [350, 450];
    public doughnutChartType: string = 'doughnut';
    
    // events
    public chartClicked(e: any): void {
        // console.log(e);
    }

    public chartHovered(e: any): void {
        // console.log(e);
    }

    public randomize(): void {
        // Only Change 3 values
        const data = [
            Math.round(Math.random() * 100),
            59,
            80,
            Math.random() * 100,
            56,
            Math.random() * 100,
            40
        ];
        const clone = JSON.parse(JSON.stringify(this.barChartData));
        clone[0].data = data;
        this.barChartData = clone;
        /**
         * (My guess), for Angular to recognize the change in the dataset
         * it has to change the dataset variable directly,
         * so one way around it, is to clone the data, change it and then
         * assign it;
         */
    }
    

    constructor() {}

    ngOnInit() {}

    toggle() {
        this.show = !this.show;
      }

    toggle_diag() {
        this.show_diag = !this.show_diag;
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



    isVisible(visible) {
        if(visible == 1)
        {
            return true;
        }

        else{
            return false;
        }
    }  
    
   // requete: string = (<HTMLInputElement>document.getElementById("prenomInput")).value;


}
