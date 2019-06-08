import { Component, OnInit, ViewChild, ElementRef, VERSION } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { $ } from 'protractor';
import { HttpClient, HttpResponse, HttpEventType,HttpHeaders } from '@angular/common/http';
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

  
  percentDone: number;
  bytesDone: number;
  totalBytes: number;
  uploadSuccess: boolean;
  files_uploaded: number = 0;
  inProgress: boolean;
  activate_table: boolean;
  file_list:File[];
  evt:Event;

   // bar chart
   public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
};
public barChartLabels: string[] = [
    'T.Lemagueresse',
    'C.Calves',
    'C.Oussin',
    'A.Nedelec',
    'A.Perennou'
];
public barChartType: string = 'bar';
public barChartLegend: boolean = true;

public barChartData: any[] = [
    { data: [16, 15, 12, 11, 9, 8, 6], label: 'Nombre de stagiaires' }
];

// Doughnut
public doughnutChartLabels: string[] = [
    'Stages avec tuteur',
    'Stages sans tuteur'
];
public doughnutChartData: number[] = [350, 450];
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



  constructor(private http: HttpClient) { }

  ngOnInit() {
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
  posthere(){
    console.log(FileReaderCopy.resultJson)
    console.log('************');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        
      })
    };
    this.http.post('http://localhost:3000/importStages', FileReaderCopy.resultJson,httpOptions)
      .subscribe(event => {  
        console.log('done')
      })
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