import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { GlobalValsService } from '../global-vals.service';

interface Product {
  nombre:string,
  descripcion:string,
  cantidad:string,
  preciocosto:string,
  precioventa:string,
  fotografia:string,
  idtienda:string,
  id:string
}

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage implements OnInit {

  filteredCliente:Product[]=[];
  addClienteModal:boolean = false;
  updateClienteModal:boolean = false;
  isAlertOpen:boolean = false;
  hea!:string;
  subHea!:string;
  mess!:string;
  alertButtons = ['OK'];
  registro:Product = {
    nombre:"",
    descripcion:"",
    cantidad:"",
    preciocosto:"",
    precioventa:"",
    fotografia:"",
    idtienda:"",
    id:""
  };
  eregistro!:Product;
  
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
    const uri = 'https://hjqwpru.000webhostapp.com/API/api.php?instr=selectproduct&idshop=' + this.globalService.id;

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
    if(!!this.registro.nombre && !!this.registro.descripcion && !!this.registro.cantidad && !!this.registro.preciocosto && !!this.registro.precioventa
      && !!this.registro.fotografia){
        
        const uri = 'https://hjqwpru.000webhostapp.com/API/api.php?instr=insertproduct&nombre='+this.registro.nombre +'&descripcion='+ this.registro.descripcion +'&cantidad='+ this.registro.cantidad +'&preciocosto='+ this.registro.preciocosto +'&precioventa='+ this.registro.precioventa +'&fotografia='+ this.registro.fotografia +'&idusuario=' + this.globalService.id;

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
          descripcion:"",
          cantidad:"",
          preciocosto:"",
          precioventa:"",
          fotografia:"",
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
  editarCliente(cliente:Product){
    this.updateClienteModal = true;
    this.eregistro = cliente;
  }
  // Actualizar los clientes
  actualizarCliente(){
    if(!!this.eregistro.nombre && !!this.eregistro.descripcion && !!this.eregistro.cantidad && !!this.eregistro.preciocosto && !!this.eregistro.precioventa
      && !!this.eregistro.fotografia && !!this.eregistro.id){
        
        const uri = 'https://hjqwpru.000webhostapp.com/API/api.php?instr=updateproduct&nombre='+this.eregistro.nombre +'&descripcion='+ this.eregistro.descripcion +'&cantidad='+ this.eregistro.cantidad +'&preciocosto='+ this.eregistro.preciocosto +'&precioventa='+ this.eregistro.precioventa +'&fotografia='+ this.eregistro.fotografia +'&id=' + this.eregistro.id;

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
    const uri = 'https://hjqwpru.000webhostapp.com/API/api.php?instr=deleteproduct&id=' + this.eregistro.id;

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
