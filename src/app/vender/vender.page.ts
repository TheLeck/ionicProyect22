import { Component, NgModule, OnInit, ViewChild } from '@angular/core';
import { GlobalValsService } from '../global-vals.service';
import { HttpClient } from '@angular/common/http';
import { NavController } from '@ionic/angular';
import { IonModal, ModalController } from '@ionic/angular/common';
import { SearchableSelectComponent } from '../components/searchable-select/searchable-select.component';
import { ExceptionCode } from '@capacitor/core';
import { DatePipe } from '@angular/common';

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

interface Product {
  nombre:string,
  descripcion:string,
  cantidad:string,
  preciocosto:string,
  precioventa:string,
  fotografia:string,
  idtienda:string,
  id:string,
  cantidadventa:number
}

@Component({
  templateUrl: './vender.page.html',
  styleUrls: ['./vender.page.scss'],
})

export class VenderPage implements OnInit {
  total:any = 0;
  idticket:any;
  currentDate: any;
  clientes:Customer[] = [];
  clientesGet:Customer[] = [];
  productos:Product[] = [];
  productosGet:Product[] = [];
  selectedProductos:Product[] = [];
  buscarCienteModalVal:boolean = false;
  buscarProductoModalVal:boolean = false;
  final:boolean = false;
  cliente:Customer = {  
    nombre:"Seleccione el cliente...",
    domicilio:"",
    correo:"",
    telefono:"",
    fotografia:"",
    periododecobrar:"",
    diacobrar:"",
    horacobrar:"",
    idtienda:"",
    id:""
  };
  clienteaux:Customer = {  
    nombre:"Seleccione el cliente...",
    domicilio:"",
    correo:"",
    telefono:"",
    fotografia:"",
    periododecobrar:"",
    diacobrar:"",
    horacobrar:"",
    idtienda:"",
    id:""
  };

  constructor(private globalService: GlobalValsService, public http: HttpClient, public navCtrl: NavController, private datePipe: DatePipe, private modalController: ModalController) {
    this.currentDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
   }

  // Cargar clientes
  ngOnInit() {
    this.consul();
  }

  consul(){
    console.log(this.globalService.id);
    const uri = 'https://hjqwpru.000webhostapp.com/API/api.php?instr=consultclient&idshop=' + this.globalService.id;

    this.http.get(uri).subscribe((data:any) => { 
      this.clientesGet = data;
      this.clientes = this.clientesGet;
      console.log(data);
     });

    console.log(this.globalService.id);
    const uri2 = 'https://hjqwpru.000webhostapp.com/API/api.php?instr=selectproduct&idshop=' + this.globalService.id;

    this.http.get(uri2).subscribe((data:any) => { 
      this.productosGet = data;
      this.productos = this.productosGet;
      console.log(data);
     });
 
  }

  // abre la modal de buscar cliente
  buscarCienteModal(a:boolean){
    this.buscarCienteModalVal = a;
  }
  // abre la modal de buscar producto
  AgregarProductoModal(a:boolean){
    this.buscarProductoModalVal = a;
  }

  buscarCiente(event:any){
    const text = event.target.value;
    this.clientes = this.clientesGet;

    this.clientes = this.clientes.filter((cliente: any) =>{
      console.log(cliente.nombre.toLowerCase());
      console.log(text.toLowerCase());
      console.log(cliente.nombre.toLowerCase().indexOf(text.toLowerCase()) > -1);
      return (cliente.nombre.toLowerCase().indexOf(text.toLowerCase()) > -1);
    });
  }

  buscarProducto(event:any){
    const text = event.target.value;
    this.productos = this.productosGet;

    this.productos = this.productos.filter((cliente: any) =>{
      console.log(cliente.nombre.toLowerCase());
      console.log(text.toLowerCase());
      console.log(cliente.nombre.toLowerCase().indexOf(text.toLowerCase()) > -1);
      return (cliente.nombre.toLowerCase().indexOf(text.toLowerCase()) > -1);
    });
  }

  selectCliente(cliente:any){ 
    this.cliente = cliente;    
    this.clientes = this.clientesGet;
    this.buscarCienteModal(false);
   }

   selectProducto(producto: Product){
    producto.cantidadventa = 1;
    this.selectedProductos.push(producto);
    this.productos = this.productosGet;
    this.AgregarProductoModal(false);
   }

   deleteProduct(product:Product){
    const index = this.selectedProductos.indexOf(product);
    if (index > -1) {
      this.selectedProductos.splice(index, 1);
    }
   }

  cerrarClientes(){
    this.navCtrl.pop();
  }

  increment(product:Product) {
    if(parseInt(product.cantidad) > product.cantidadventa){
      product.cantidadventa++;
    }
  }

  decrement(product:Product) {
    if (product.cantidadventa > 1) {
      product.cantidadventa--;
    }
  }
  checkStock(product:Product){
    //const text = event.target.value;
    if((parseInt(product.cantidad) >= product.cantidadventa) == false){
      product.cantidadventa= parseInt(product.cantidad);
    }
  }

  vender(){
    if(this.cliente != this.clienteaux && this.selectedProductos.length > 0 ){
      console.log("aaaaaaaaaaaaaaaaaaaaaa");
      this.total = 0;
      for(let i = 0; this.selectedProductos.length > i; i++){
        if(this.selectedProductos[i].cantidadventa == 0 || this.selectedProductos[i].cantidadventa > parseInt(this.selectedProductos[i].cantidad)){
          alert("Error en la cantidad de productos");
          return
        }else{
          this.total += (this.selectedProductos[i].cantidadventa * parseInt(this.selectedProductos[i].precioventa)); 
        }
      }

      if(this.currentDate != null){
        // insertar ticket
        const url = "https://hjqwpru.000webhostapp.com/API/api.php?instr=insertticket&fecha="+ this.currentDate +"&idcliente="+ this.cliente.id +"&total="+ this.total +"&credito=no&pagado=no";

        this.http.get(url).subscribe(
          (res: any) => {
            this.idticket = res.id;
            // Insertar detalle de ticket
            for(let i = 0; this.selectedProductos.length > i; i++){
              const url = "https://hjqwpru.000webhostapp.com/API/api.php?instr=insertdetalleticket&idproducto="+ this.selectedProductos[i].id +"&idticket="+ res.id +"&nombre="+ this.selectedProductos[i].nombre +"&cantidad="+ this.selectedProductos[i].cantidadventa +"&precio=" + this.selectedProductos[i].precioventa + "&newproduct=" + (parseInt(this.selectedProductos[i].cantidad) - this.selectedProductos[i].cantidadventa);

              this.http.get(url).subscribe(
                (res: any) => {
                  // Si se inserto correctamente cada detalle de ticket
                },
                (error) => {
                  // Error en un detalle de ticket
                  console.log("Error HTTP:", error);
                }
              );
            }
          },
          (error) => {
            // Erorr al insertar ticket
            console.log("Error HTTP:", error);
          }
        );

        // YA TERMINO TODO!!!!!!!!!!!!!!!!!!!!
        this.showFinal(true);
      }
    } else{
      alert("Datos vacios");
    }
  }

  parIn(a:any, b:any){
    return parseInt(a) * parseInt(b);
  }

  showFinal(a:boolean){
    this.final = a;
  }

  retur(){
    this.navCtrl.pop();
    this.modalController.dismiss();
    //const modal1 = this.navCtrl.navigateForward('/home')
  }
    

}
