import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  user!:string;
  name!:string;
  pass!:string;
  shop!:string;
  url!:string;
  isAlertOpen:boolean = false;
  alertButtons=['OK'];
  mess!:string;
  hea!:string;
  subHea!:string;
  constructor(public regisCtrl: ModalController, public http: HttpClient) { }

  ngOnInit() {
  }

  registrar(){
    if(!!this.user && !!this.name && !!this.pass && !!this.shop && !!this.url){
      const uri = 'https://hjqwpru.000webhostapp.com/API/api.php?instr=insertuser&usuario='+ this.user +'&contrasena='+ this.pass +'&nombre='+ this.name +'&tienda='+ this.shop +'&logo='+this.url;

      this.http.get(uri).subscribe((data:any) => {
        if(data.status == "ok"){
          console.log("Jitomate");
          console.log(data);
          this.regisCtrl.dismiss();
        }else{
          this.hea = "Error";
          this.subHea = "Error al guardsr los datos";
          this.mess = "Ups... Algo asio mal...";
          this.Show(true);
        }
      });
    }else{
      this.hea = "Error";
      this.subHea = "Error al registrar";
      this.mess = "Los campos no pueden estar vacios";
      this.Show(true);
    }
  }

  cancel(){
    this.regisCtrl.dismiss();
  }

  Show(bol: boolean){
    this.isAlertOpen = bol; 
  }
}
