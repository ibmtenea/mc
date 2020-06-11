import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constantes } from '../models/constantes.model';
import { NgxSpinnerService } from "ngx-spinner";
import { Inventario } from '../models/inventario';
import { DataserviceService } from './dataservice.service';


@Injectable({
  providedIn: 'root'
})
export class HomeService {

  unsubscribe() {
  }

  public inventario: Inventario;
  //constantes
  private PHP_API_SERVER = Constantes.API_SERVER; //URL del servicio
  public showSpinner: boolean = false;
  //  userTabLocation0 = localStorage.getItem('userTabLocationRB4');
  constructor(private spinner: NgxSpinnerService,private httpClient: HttpClient,private dataService: DataserviceService) { }

  showLoadingSpinner() {
    this.spinner.show();
  }
  
  hideLoadingSpinner() {
    this.spinner.hide();
  }

  getInventario(cb){
    const req = new XMLHttpRequest();
    this.showLoadingSpinner();
    req.open('GET', `${this.PHP_API_SERVER}/ajax/read_inventario.php`);
    req.onload = () => {
      cb(JSON.parse(req.response));
      this.hideLoadingSpinner();
    };
    req.send();
  }

  
  getDetalleInventario( tokenid:string ){
    return this.httpClient.get(`${ this.PHP_API_SERVER}/ajax/detalle_inventario.php?tokenid=${ tokenid }`);
  }


  updateCampos(datos){
    console.log(datos);
    return this.httpClient.post(`${this.PHP_API_SERVER}/ajax/update_inventario.php`,datos);
  }


  updateRegistro(datos){
    console.log(datos);
    return this.httpClient.post(`${this.PHP_API_SERVER}/ajax/update_inventario_total.php`,datos);
  }

  delete(datosborrado){
    return this.httpClient.post(`${this.PHP_API_SERVER}/ajax/delete_inventario.php`,datosborrado);
  }
  

}
