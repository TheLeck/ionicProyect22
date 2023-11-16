import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { RegisterPage } from '../register/register.page';
import { GlobalValsService } from '../global-vals.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  registros!:any;
  user!:string;
  pass!:string;
  isAlertOpen:boolean = false;
  alertButtons=['OK'];
  mess!:string;
  hea!:string;
  subHea!:string;
  constructor(public http: HttpClient, public loginCtrl: ModalController, private globalService: GlobalValsService) { }

  ngOnInit() {
  }
  entrar() {
    if(!!this.user && !!this.pass){
      const uri = 'https://hjqwpru.000webhostapp.com/API/api.php?instr=login&usuario='+this.user+'&contrasena='+this.pass;

      this.http.get(uri).subscribe((data:any) => {
        if(!!data.nombre){
          console.log("Jitomate");
          console.log(data.nombre);
          console.log(data.logo);
          this.globalService.name = data.nombre;
          this.globalService.url = data.logo;
          this.globalService.id = data.id;
          console.log("Globals");
          console.log(this.globalService.name);
          console.log(this.globalService.url);
          this.loginCtrl.dismiss();
        }else{
          this.hea = "Error";
          this.subHea = "Credenciales erroneas";
          this.mess = "Las credenciales no coinciden";
          this.Show(true);
        }
      });
    } else{
      this.hea = "Error";
      this.subHea = "Error al consultar";
      this.mess = "Los campos no pueden estar vacios";
      this.Show(true);
    }
    
  }
  async registrar(){
      const modal = await this.loginCtrl.create({
        component: RegisterPage
      });
      return await modal.present();
  }

  Show(bol: boolean){
    this.isAlertOpen = bol; 
  }

}
