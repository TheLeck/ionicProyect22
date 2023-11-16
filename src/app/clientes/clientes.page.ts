import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
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
  
  constructor(public clientCtrl: ModalController, public http: HttpClient, private globalService: GlobalValsService) { 
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
    this.clientCtrl.dismiss();
  }

  // Mostrar modal de agregar clientes
  AgregarClientesModal(){
    this.addClienteModal = true;
  }
  // Funcion para guardar los datos
  guardarClientes(){
    if(!!this.registro.nombre && !!this.registro.domicilio && !!this.registro.correo && !!this.registro.telefono && !!this.registro.fotografia
      && !!this.registro.periododecobrar && !!this.registro.diacobrar && !!this.registro.horacobrar && !!this.registro.idtienda){
        
        const uri = 'https://hjqwpru.000webhostapp.com/API/api.php?instr=consultclient&idshop=' + this.globalService.id;

        this.http.get(uri).subscribe((data:any) => { 
          this.filteredCliente = data;
          console.log(data);
         });

         this.hea = "Exito";
         this.subHea = "REgistro guardado con exito";
         this.mess = "El registro se agrego correctamente";
         this.Show(true);
      } else{
        this.hea = "Error";
        this.subHea = "Error al guardar";
        this.mess = "Los campos no pueden estar vacios";
        this.Show(true);
      }
  }
  // Dejar de mistrar la modal de agregar clientes
  CancelarAgregarClientesModal(){
    this.addClienteModal = false;
  }

  // Muestra la modal de edicion de clientes
  editarCliente(cliente:Customer){
    this.updateClienteModal = true;
    this.eregistro = cliente;
  }
  // Actualizar lso clientes
  actualizarCliente(cliente:any){}
  // Cancelar la ventana modal de actualizar clientes
  CancelarActualizarClientesModal(){
    this.updateClienteModal = false;
  }

  // Elimina un cliente
  eliminarCliente(id:any){}

  // Mostrar o ocultar alertas
  Show(a:boolean){
    this.isAlertOpen = a;
  }

}
