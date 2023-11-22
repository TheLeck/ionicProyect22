import { Component } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { LoginPage } from '../login/login.page';
import { GlobalValsService } from '../global-vals.service';
import { ClientesPage } from '../clientes/clientes.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  registros: any;
  name:string = "kaugdbla";
  url!:string;
  constructor(public modalController: ModalController, private globalService: GlobalValsService, public navCtrl: NavController) {
    //this.cargar();
    this.iniciarSesion();
  }

  async iniciarSesion() {
    const modal = await this.modalController.create({
      component: LoginPage
    });
    await modal.present();
    modal.onDidDismiss().then((data) => {
      console.log('Modal closed');
      console.log(data);
      this.name = this.globalService.name;
      this.url = this.globalService.url;
    });
  }

  async clientesModal(){
    const modal1 = this.navCtrl.navigateForward('/clientes')
    /*
    const modal1 = await this.modalController.create({
      component: ClientesPage
    });
    await modal1.present();
    modal1.onDidDismiss().then((data) => {
      console.log('Modal closed');
      console.log(data);
      this.name = this.globalService.name;
      this.url = this.globalService.url;
    });
    */
  }

}