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
          nom: 'aeae',
          prenom: 'eazea',
          semestre: "S10",
          trouve: "OUI",
          entreprise: "Arinfo",
          tuteur: "LE MAGUERESSE T."
    
        },
        {
          
            nom: 'test',
            prenom: 'afaf',
            semestre: "S8",
            trouve: "NON",
            entreprise: "",
            tuteur: ""
      
          },
          {
          
            nom: 'test',
            prenom: 'afaf',
            semestre: "IS2",
            trouve: "OUI",
            entreprise: "SDMO",
            tuteur: "ANSQUER C."
      
          },
    
      ];

      elevesFiltered = this.eleves;
    // bar chart
    public barChartOptions: any = {
        scaleShowVerticalLines: false,
        responsive: true
    };
    public barChartLabels: string[] = [
        '2006',
        '2007',
        '2008',
        '2009',
        '2010',
        '2011',
        '2012'
    ];
    public barChartType: string = 'bar';
    public barChartLegend: boolean = true;

    public barChartData: any[] = [
        { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
        { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
    ];

    // Doughnut
    public doughnutChartLabels: string[] = [
        'Download Sales',
        'In-Store Sales',
        'Mail-Order Sales'
    ];
    public doughnutChartData: number[] = [350, 450, 100];
    public doughnutChartType: string = 'doughnut';

    // Radar
    public radarChartLabels: string[] = [
        'Eating',
        'Drinking',
        'Sleeping',
        'Designing',
        'Coding',
        'Cycling',
        'Running'
    ];
    public radarChartData: any = [
        { data: [65, 59, 90, 81, 56, 55, 40], label: 'Series A' },
        { data: [28, 48, 40, 19, 96, 27, 100], label: 'Series B' }
    ];
    public radarChartType: string = 'radar';

    // Pie
    public pieChartLabels: string[] = [
        'Download Sales',
        'In-Store Sales',
        'Mail Sales'
    ];
    public pieChartData: number[] = [300, 500, 100];
    public pieChartType: string = 'pie';

    // PolarArea
    public polarAreaChartLabels: string[] = [
        'Download Sales',
        'In-Store Sales',
        'Mail Sales',
        'Telesales',
        'Corporate Sales'
    ];
    public polarAreaChartData: number[] = [300, 500, 100, 40, 120];
    public polarAreaLegend: boolean = true;

    public polarAreaChartType: string = 'polarArea';

    // lineChart
    public lineChartData: Array<any> = [
        { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
        { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' },
        { data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C' }
    ];
    public lineChartLabels: Array<any> = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July'
    ];
    public lineChartOptions: any = {
        responsive: true
    };
    public lineChartColors: Array<any> = [
        {
            // grey
            backgroundColor: 'rgba(148,159,177,0.2)',
            borderColor: 'rgba(148,159,177,1)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        },
        {
            // dark grey
            backgroundColor: 'rgba(77,83,96,0.2)',
            borderColor: 'rgba(77,83,96,1)',
            pointBackgroundColor: 'rgba(77,83,96,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(77,83,96,1)'
        },
        {
            // grey
            backgroundColor: 'rgba(148,159,177,0.2)',
            borderColor: 'rgba(148,159,177,1)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        }
    ];
    public lineChartLegend: boolean = true;
    public lineChartType: string = 'line';

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

      onKey() {
        this.filtreName();
      }
    
   // requete: string = (<HTMLInputElement>document.getElementById("prenomInput")).value;
    filtreName() {

        
        var requete = (<HTMLInputElement>document.getElementById("nomInput")).value;
        var requete2 = (<HTMLInputElement>document.getElementById("prenomInput")).value;
        var requete3 = (<HTMLInputElement>document.getElementById("myBrowserSemestre")).value;
        var requete4 = (<HTMLInputElement>document.getElementById("myBrowserFind")).value;
        var requete5 = (<HTMLInputElement>document.getElementById("myBrowserEntreprise")).value;
        var requete6 = (<HTMLInputElement>document.getElementById("myBrowserTutor")).value;

        this.elevesFiltered = [];

        if(requete != '' || requete2 != '' 
        || requete3 != '' || requete4 != ''
        || requete5 != '' || requete6 != '')
        {
            for(let i = 0; i < this.eleves.length; i++)
            {    
                if(this.eleves[i].nom == requete){
                    this.elevesFiltered.push(this.eleves[i]);
                }
                if(this.eleves[i].prenom == requete2){
                    this.elevesFiltered.push(this.eleves[i]);
                }
                if(this.eleves[i].semestre == requete3){
                    this.elevesFiltered.push(this.eleves[i]);
                }
                if(this.eleves[i].trouve== requete4){
                    this.elevesFiltered.push(this.eleves[i]);
                }
                if(this.eleves[i].entreprise== requete5){
                    this.elevesFiltered.push(this.eleves[i]);
                }
                if(this.eleves[i].tuteur== requete6){
                    this.elevesFiltered.push(this.eleves[i]);
                }
            }
        }

        else{
            this.elevesFiltered = this.eleves;
        }

    }

}
