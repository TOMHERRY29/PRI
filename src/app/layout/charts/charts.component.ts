import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { GlobalStageService } from '../../services/global-stage.service';
import { ElevesService } from '../../services/eleves.service';
import { StageGlobal } from '../../models/stageGlobal.model';
import { Subscription } from 'rxjs';
import { EnibiensMonde } from '../../models/enibiensMonde.model';
import { EnibiensParPays } from '../../models/enibiensParPays.model';
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

    /* stageGlobel */
    private stageGSub: Subscription;
    private eleveSub: Subscription;
    private enibienSub: Subscription;
    stagesG: StageGlobal[] = [];
    enibiensMonde: EnibiensMonde[] = [];
    enibiensParPays: EnibiensParPays[] = [];

    // bar chart
    public barChartOptions: any = {
        scaleShowVerticalLines: false,
        responsive: true
    };
    public barChartLabels: string[] = [''];
    public barChartType: string = 'bar';
    public barChartLegend: boolean = true;

    public barData : Number [] = [0];
    
    public barChartData: any[] = [this.barData];

    // Doughnut

    public doughnutData : Number [] = [];

    public doughnutChartLabels: string[] = [];
    public doughnutChartData: any[] = [this.doughnutData];
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
    

    constructor(public globalStageService: GlobalStageService, public enibiensMondeService: ElevesService, public enibiensParPaysService: ElevesService){}

    ngOnInit() {
        /* get global stage */
        this.globalStageService.getStageG();
        this.stageGSub = this.globalStageService.getStageUpdateListener()
            .subscribe((stagesG: StageGlobal[]) => {
                this.stagesG = stagesG;
            });

            
            this.enibiensMondeService.getNombreStagesMonde();
            this.eleveSub = this.enibiensMondeService.getEnibiensMondeListener()
            .subscribe((enibiensMonde: EnibiensMonde[]) => {
                this.enibiensMonde = enibiensMonde;
              
                for(var i = 0; i < this.enibiensMonde.length; i++)
                {
                  this.doughnutData.push(this.enibiensMonde[i].nombre);
                  this.doughnutChartLabels.push(this.enibiensMonde[i].nomPays);
                };
            });

            this.enibiensParPaysService.getEnibiensParPays();
            this.enibienSub = this.enibiensParPaysService.getEnibiensParPaysListener()
            .subscribe((enibiensParPays: EnibiensParPays[]) => {
                this.enibiensParPays = enibiensParPays;
              
                for(var i = 0; i < this.enibiensParPays.length; i++)
                {
                  this.barData.push(this.enibiensParPays[i].nombre);
                  this.barChartLabels.push(this.enibiensParPays[i].nomPays);
                };

                console.log("enibiensParPays",this.enibiensParPays);
                console.log("barData",this.barData);
                console.log("barChartLabels",this.barChartLabels);
            });

    }

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
