import { Component, OnInit, ViewChild, ElementRef, VERSION } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { $ } from 'protractor';
import { HttpClient, HttpResponse, HttpEventType,HttpHeaders } from '@angular/common/http';
import { StatsTuteursAffecte } from '../../models/statsTuteursAffecte';
import { AdminService } from '../../services/AdminService';

import { StatsStageTuteurCompte } from '../../models/statsStageTuteurCompte';
import { statsStageTuteurCompteservices } from '../../services/statsStageTuteurCompteservices';


import { Subscription } from 'rxjs';
var XLSX = require('xlsx');


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  animations: [routerTransition()]
})
 
export class AdminComponent implements OnInit {

    @ViewChild('fileInput') fileInput:ElementRef;

  public show:boolean = true;
  public show_stat:boolean = false;
  public show_camp:boolean = false;
  public buttonName:any = 'Documents';
  public buttonName2:any = 'Statistiques';
  public buttonName3:any = 'Campagnes';

  

  private statsGSub: Subscription;
  private statsGSubTuteurs: Subscription;
  statsStages: StatsTuteursAffecte[] = [];
  statsTuteur: StatsStageTuteurCompte[] = [];

  
  percentDone: number;
  bytesDone: number;
  totalBytes: number;
  uploadSuccess: boolean;
  files_uploaded: number = 0;
  inProgress: boolean;
  activate_table: boolean;
  file_list:File[];
  evt:Event;

   // Bar Chart
   public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
};


public barData : Number [] = [0];
public barChartLabels: string[] = [''];
public barChartType: string = 'bar';
public barChartLegend: boolean = true;
public barChartData: any[] = [this.barData];




// Doughnut
public doughnutData : Number [] = [];
public doughnutChartLabels: string[] = [
    'Stages avec tuteur',
    'Stages sans tuteur'
];
public doughnutChartData: any [] = [this.doughnutData];
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

}

  constructor(private http:HttpClient,public adminService:AdminService, public statsStageTuteurCompteService : statsStageTuteurCompteservices) { }

  ngOnInit() {

        this.adminService.getStats();
        this.statsGSub = this.adminService.getStatsUpdateListener()
            .subscribe((stat: StatsTuteursAffecte[]) => {
                this.statsStages = stat;
                  this.doughnutData.push(this.statsStages[0].stageA);
                  this.doughnutData.push(this.statsStages[0].stageNA);
                
            });

        

        this.statsStageTuteurCompteService.getStatsTuteurs();
        this.statsGSubTuteurs = this.statsStageTuteurCompteService.getStatsUpdateListener()
            .subscribe((stat: StatsStageTuteurCompte[]) => {
                this.statsTuteur = stat;
                for(var i = 0; i < this.statsTuteur.length; i++)
                {
                  this.barData.push(this.statsTuteur[i].nmbrStages);
                  this.barChartLabels.push(this.statsTuteur[i].PrenomTuteur + " - " + this.statsTuteur[i].NomTuteur);
                }
            });

        // setTimeout(() => console.log("barData", this.barData),1000);
        // setTimeout(() => console.log("barChartLabels", this.barChartLabels),1000);

  }

  toggle() {
    this.show = !this.show;
  }

  toggle_stat() {
    this.show_stat = !this.show_stat;
  }

  
  toggle_camp() {
    this.show_camp = !this.show_camp;
}

public openFileDialog():void {
    let event = new MouseEvent('click', {bubbles: false});
    this.fileInput.nativeElement.dispatchEvent(event);
  }

  @ViewChild('form') form;


  reset() {
    this.form.nativeElement.reset();
    this.activate_table = false;
    this.files_uploaded = 0;
    this.uploadSuccess = false;
  }
  uploar(e){
    this.upload(e.target.files);
    this.xlstoJson(e);
  }
  upload(files: File[]){
    this.uploadAndProgress(files);
    this.inProgress = true;
  }
  xlstoJson(e){
    this.upload(e.target.files);
   // this.evt = e;
    this.send(e);
  }
  async posthere(){
    console.log(FileReaderCopy.resultJson)
    console.log('************');
    this.adminService.setAjoutStageExcel(FileReaderCopy.resultJson);
  }

  async send(evt){
    console.log("bien")
    console.log(FileReaderCopy.resultJson);
    console.log("*************")
    //var f= this.file_list[0];
    /*var reader = new FileReader();
    console.log("bien 2")*/
    
    //var data = new Uint8Array(e.target.result);
    //var workbook = XLSX.read(data, {type: 'array'});
    var files = (<HTMLInputElement>evt.target).files;
    
    console.log("before for")
    var json_object;
    for (var i = 0;i < files.length; i++) {
      console.log("after for")
      var f = files[i];
     
      var reader = new FileReaderCopy();

      // Closure to capture the file information.
       reader.onload =  (function(theFile) {
        return function(e) {
          
          var data = e.target.result;
          var workbook = XLSX.read(data, {
          type: 'binary'
          });

          
          return workbook.SheetNames.forEach(function(sheetName) {
          // Here is your object
              var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
              json_object = JSON.stringify(XL_row_object);
              //this.posthere(json_object);
              //console.log(json_object);
              FileReaderCopy.resultJson = json_object;
              return json_object;
              /* var fs = require('fs');

              var obj = {
              table: []
              };*/

              })
              

        };
        /*this.posthere(js);
        return js;*/
      })(f);
      
      json_object = await reader.readAsBinaryString(f);
      console.log('help')
      console.log(FileReaderCopy.resultJson);
      // Read in the image file as a data URL.
      //reader.readAsDataURL(f);
      

          };

    /* DO SOMETHING WITH workbook HERE */
  
  //reader.readAsArrayBuffer(f);

    
  }
  basicUpload(files: File[]){
    var formData = new FormData();
    Array.from(files).forEach(f => formData.append('file', f))
    this.http.post('https://file.io', formData)
      .subscribe(event => {  
        console.log('done')
      })
  }
  
  basicUploadSingle(file: File){    
    this.http.post('https://file.io', file)
      .subscribe(event => {  
        console.log('done')
      })
  }
  
  uploadAndProgress(files: File[]){
    console.log(files)
    var formData = new FormData();
    Array.from(files).forEach(f => formData.append('file',f));
    this.file_list = files;
    this.http.post('https://file.io', formData, {reportProgress: true, observe: 'events'})
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.totalBytes = event.total;
          this.percentDone = Math.round(100 * event.loaded / this.totalBytes);
          this.bytesDone = event.loaded;
        } else if (event instanceof HttpResponse) {
          this.uploadSuccess = true;
          setTimeout(() => this.updateProgress(), 3000);
        }
    });
  }

  uploadAndProgressSingle(file: File){    
    this.http.post('https://file.io', file, {reportProgress: true, observe: 'events'})
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.totalBytes = event.total;
          this.percentDone = Math.round(100 * event.loaded / this.totalBytes);
          this.bytesDone = event.loaded;
        } else if (event instanceof HttpResponse) {
          this.uploadSuccess = true;
          setTimeout(() => this.updateProgress(), 3000);
        }
    });
  }

  updateProgress(){
    this.uploadSuccess = false;
    this.inProgress = false;
    this.files_uploaded = this.files_uploaded+1;
    this.percentDone = null;
    this.totalBytes = null;
    this.bytesDone = null;
    if(this.files_uploaded > 0){
        this.activate_table=true;
      }
  }

  

}
class FileReaderCopy extends FileReader{
  public static resultJson:JSON;
}