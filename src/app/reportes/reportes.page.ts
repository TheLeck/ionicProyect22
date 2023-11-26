import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { GlobalValsService } from '../global-vals.service';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.page.html',
  styleUrls: ['./reportes.page.scss'],
})
export class ReportesPage implements OnInit {
  final:boolean = false;
  date1!:string;
  date2!:string;
  result:any[] =[];

  constructor(public miDatePipe: DatePipe, public navCtrl: NavController, private modalController: ModalController, public http: HttpClient, private globalService: GlobalValsService) { }

  ngOnInit() {
  }

  show(){
    this.final = true;
    console.log(this.miDatePipe.transform(this.date1, 'yyyy-MM-dd'));

    const uri = 'https://hjqwpru.000webhostapp.com/API/api.php?instr=selectreport&date1='+ this.miDatePipe.transform(this.date1, 'yyyy-MM-dd') +'&date2='+ this.miDatePipe.transform(this.date2, 'yyyy-MM-dd') +'&idshop=' + this.globalService.id;

    this.http.get(uri).subscribe((data:any) => { 
      this.result = data;
      console.log(data);
     });
  }

  retur(){
    this.navCtrl.pop();
    this.modalController.dismiss();
    //const modal1 = this.navCtrl.navigateForward('/home')
  }

}
