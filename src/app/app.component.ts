import { Component } from '@angular/core';
import {ElectronService} from 'ngx-electron';
//import fs = require('fs');
//
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  msg = 'Reading FTP data in back ground Please enter C and D column!';
  Ccolumn:string = "D";
  isdone:boolean = false;
  Dcolumn:string = "B";
  Clines:any = [];
  ClinesProcessed:any = [];
  ftpdata:string="";

    constructor(private _electronService: ElectronService) {
      
      this._electronService.ipcRenderer.addListener('async-reply',(event:any, arg:any)=>{ this.isdone=true;
       
        this.ftpdata = arg;
        this.Clines = this.extractData(arg);
        this.msg = "Data Recived....";
        this.isdone = true;
    })
     }

   matchstep2(){
    if(!this.isdone){
alert("Please request data first!.");
    }
    else{
      let i:number=0;
      
     for (i=0;i<this.Clines.length;i++){
     
        let v:string = this.Clines[i];
        
        v = v.replace(".JPG", "").replace(".jpg", "");
      // console.log (v.split(" ")[0]);
        v=v.split(" ")[0];
          if(this.Dcolumn.indexOf(v)!=-1){
              this.ClinesProcessed.push("\""+v+"\""+",R-Column\r\n");
          }
          else{
           if(this.Ccolumn.indexOf(v)!=-1){
            this.ClinesProcessed.push("\""+v+"\""+",C-Column\r\n");
          }
          else{
            this.ClinesProcessed.push("\""+v+"\""+",NOT FOUND\r\n");
          }
          }
          
      }
    }
    var p= this._electronService.ipcRenderer.send("tabora",[this.ClinesProcessed]);
    //console.log(this.ClinesProcessed);
   }
    matchit(){
      this.msg="Requesting FTP listing data....";
      this.delay(1000);
      this.Clines =  this.extractData(this.Ccolumn);
     var p= this._electronService.ipcRenderer.send("async",[this.Ccolumn,this.Dcolumn]);
     
      console.log("sds");
    }

//////////////////////////////
 delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
 }

  private extractData(csvdata:string) {

    let csvData = csvdata || '';
    let allTextLines = csvData.split(/\r\n|\n/);
    
    //let headers = allTextLines[2].split(',');
     //console.log(headers);
    
    let lines = [];
    lines = allTextLines;
/*
    for ( let i = 0; i < allTextLines.length; i++) {
        // split content based on comma
        let data = allTextLines[i].split(',');
        if (data.length == headers.length) {
            let tarr = [];
            for ( let j = 0; j < headers.length; j++) {
                tarr.push(data[j]);
            }
            lines.push(tarr);
        }
    }*/
    return lines;
  }

/////////////////////////////




}
