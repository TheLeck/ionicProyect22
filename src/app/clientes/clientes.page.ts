import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { GlobalValsService } from '../global-vals.service';

interface Customer {
  nombre:string,
  domicilio:string,
  correo:string,
  telefono:string,
  fotografia:string,
  periododecobrar:string,
  diacobrar:string,
  horacobrar:string,
  idtienda:string,
  id:string
}


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
})
export class ClientesPage implements OnInit {

  filteredCliente:Customer[]=[];
  addClienteModal:boolean = false;
  updateClienteModal:boolean = false;
  isAlertOpen:boolean = false;
  hea!:string;
  subHea!:string;
  mess!:string;
  alertButtons = ['OK'];
  registro:Customer = {
    nombre:"",
    domicilio:"",
    correo:"",
    telefono:"",
    fotografia:"",
    periododecobrar:"",
    diacobrar:"",
    horacobrar:"",
    idtienda:"",
    id:"0"
  };
  eregistro!:Customer;
  
  constructor(public clientCtrl: ModalController, public http: HttpClient, private globalService: GlobalValsService, public navCtrl: NavController) { 
    /*
    this.filteredCliente.push({
      nombre:"",
      domicilio:"",
      correo:"",
      telefono:"",
      fotografia:"",
      periodocobrar:"",
      diacobrar:"",
      horacobrar:"",
      idtienda:"",
      id:0
    });
    */
  }

  // Cargar clientes
  ngOnInit() {
    this.consul();
  }

  consul(){
    console.log(this.globalService.id);
    const uri = 'https://hjqwpru.000webhostapp.com/API/api.php?instr=consultclient&idshop=' + this.globalService.id;

    this.http.get(uri).subscribe((data:any) => { 
      this.filteredCliente = data;
      console.log(data);
     });
     
     console.log(this.filteredCliente);
  }

  // Cerrar modal de clientes
  cerrarClientes(){
    this.navCtrl.pop();
  }

  // Mostrar modal de agregar clientes
  AgregarClientesModal(){
    this.addClienteModal = true;
  }
  // Funcion para guardar los datos
  guardarClientes(){
    if(!!this.registro.nombre && !!this.registro.domicilio && !!this.registro.correo && !!this.registro.telefono && !!this.registro.fotografia
      && !!this.registro.periododecobrar && !!this.registro.diacobrar && !!this.registro.horacobrar){
        
        const uri = 'https://hjqwpru.000webhostapp.com/API/api.php?instr=insertclient&nombre='+ this.registro.nombre +'&domicilio='+ this.registro.domicilio +'&correo='+ this.registro.correo +'&telefono='+ this.registro.telefono +'&fotografia='+ this.registro.fotografia +'&periododecobrar='+ this.registro.periododecobrar +'&diacobrar='+ this.registro.diacobrar +'&horacobrar='+ this.registro.horacobrar +'&idusuario=' + this.globalService.id;

        this.http.get(uri).subscribe((data:any) => { 
          //this.filteredCliente = data;
          this.consul();
          console.log(data);
         });

         this.hea = "Exito";
         this.subHea = "Registro guardado con exito";
         this.mess = "El registro se agrego correctamente";
         this.Show(true);
         this.registro = {
          nombre:"",
          domicilio:"",
          correo:"",
          telefono:"",
          fotografia:"",
          periododecobrar:"",
          diacobrar:"",
          horacobrar:"",
          idtienda:"",
          id:"0"
        };
         this.addClienteModal= false;
      } else{
        console.log("errro en los capos");
        this.hea = "Error";
        this.subHea = "Error al guardar";
        this.mess = "Los campos no pueden estar vacios";
        this.Show(true);
      }
  }
  // Dejar de mostrar la modal de agregar clientes
  CancelarAgregarClientesModal(){
    this.addClienteModal = false;
  }

  // Muestra la modal de edicion de clientes
  editarCliente(cliente:Customer){
    this.updateClienteModal = true;
    this.eregistro = cliente;
  }
  // Actualizar los clientes
  actualizarCliente(){
    if(!!this.eregistro.nombre && !!this.eregistro.domicilio && !!this.eregistro.correo && !!this.eregistro.telefono && !!this.eregistro.fotografia
      && !!this.eregistro.periododecobrar && !!this.eregistro.diacobrar && !!this.eregistro.horacobrar && !!this.eregistro.id){
        
        const uri = 'https://hjqwpru.000webhostapp.com/API/api.php?instr=updateclient&nombre='+ this.eregistro.nombre +'&domicilio='+ this.eregistro.domicilio +'&correo='+ this.eregistro.correo +'&telefono='+ this.eregistro.telefono +'&fotografia='+ this.eregistro.fotografia +'&periododecobrar='+ this.eregistro.periododecobrar +'&diacobrar='+ this.eregistro.diacobrar +'&horacobrar='+ this.eregistro.horacobrar +'&id=' + this.eregistro.id;

        this.http.get(uri).subscribe((data:any) => { 
          //this.filteredCliente = data;
          this.consul();
          console.log(data);
         });

         this.hea = "Exito";
         this.subHea = "Registro actualizado con exito";
         this.mess = "El registro se actualizo correctamente";
         this.Show(true);
         this.CancelarActualizarClientesModal();
      } else{
        console.log("errro en los capos");
        this.hea = "Error";
        this.subHea = "Error al guardar";
        this.mess = "Los campos no pueden estar vacios";
        this.Show(true);
      }
  }
  // Cancelar la ventana modal de actualizar clientes
  CancelarActualizarClientesModal(){
    this.updateClienteModal = false;
  }

  // Elimina un cliente
  eliminarCliente(id:any){
    const uri = 'https://hjqwpru.000webhostapp.com/API/api.php?instr=deleteclient&id=' + this.eregistro.id;

    this.http.get(uri).subscribe((data:any) => { 
      //this.filteredCliente = data;
      this.consul();
      console.log(data);
     });

     this.hea = "Exito";
     this.subHea = "Registro eliminado con exito";
     this.mess = "El registro se elimino correctamente";
     this.Show(true);
     this.CancelarActualizarClientesModal();
  }

  // Mostrar o ocultar alertas
  Show(a:boolean){
    this.isAlertOpen = a;
  }

}
