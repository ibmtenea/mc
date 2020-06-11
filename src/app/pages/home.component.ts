import { Component, OnInit, HostListener, AfterViewInit, ViewChild } from '@angular/core';
import { MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs';
import { NgxSpinnerService } from "ngx-spinner";
import { HomeService } from '../services/home.service';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { DataserviceService } from '../services/dataservice.service';
import Swal from 'sweetalert2';
import { Inventario } from '../models/inventario';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { Personas } from '../models/personas';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
  
})
export class HomeComponent implements OnInit {

  // ESTA PARTE ESTA COMENTADA PORQURE DE MOMENTO SE
  // EVITA EL USO DE TABS MATERIAL
  // @ViewChild(MatTabGroup) tabGroup: MatTabGroup;

  //   ngAfterViewInit() {
  //     const index = Number(localStorage.getItem('userTabLocationRB4')) || 0;
  //     this.tabGroup.selectedIndex = index;
  //   }
    
  //   handleMatTabChange(event: MatTabChangeEvent) {
  //     localStorage.setItem('userTabLocationRB4', String(event.index));
  //   }
    
    my_messages = {
      'emptyMessage': '',
      'totalMessage': ''
    };
   
    rows = [];
    temp = [];
    
    @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;
 
    id_esse: any;
    id_persona: any; 
    campo: any;
    valor: any;
    ever: any;
    
    datos: string;
    editing = {};
    datosborrado: string;

    ColumnMode = ColumnMode;
  id_inventario: any;
    
    //click fuera del input
    @HostListener('document:click', ['$event'])
    clickout(event) {
    }

    user:Personas = new Personas();

    constructor(private homeServicio: HomeService,private spinner: NgxSpinnerService,private dataService: DataserviceService) { 
      /**
      * recibimos el listado
      */
      this.homeServicio.getInventario(data => {
      this.temp = [...data];
      this.rows = data;
      });

    }
  
  
  
    ngOnInit(): void{
      this.getUsuario();
    }
  
    ngOnDestroy() {
      this.homeServicio.unsubscribe();
    }
  
    /**
     * reload pagina al usar sweet alerts etc
     */
    recarga() {
      location.reload();
    }

    getUsuario(){   
      const id_persona = localStorage.getItem('id_persona'); 
      this.dataService.getUserId ( id_persona )
        .subscribe( (resp:Personas) => {
          this.user = resp;
        });
    }

    /**
    * actualizacion campos inline
    */
    updateValue(event, cell, rowIndex) {
      this.editing[rowIndex + '-' + cell] = false;
      this.rows[rowIndex][cell] = event.target.value;
      this.rows = [...this.rows];
      this.campo = cell;
      this.id_inventario = event.target.title;
      const id_persona = localStorage.getItem('id_persona');
      this.valor = event.target.value;
      this.ever =  this.campo,  this.valor,this.id_inventario;
      this.datos = JSON.stringify({ "id_persona": id_persona,"campo": this.campo, "valor": this.valor ,"id_inventario": this.id_inventario});

      this.homeServicio.updateCampos(this.datos).subscribe(
          datos => {
            Swal.fire({
              text: 'Registro actualizado',
              icon: 'success',
              showConfirmButton: false
            })
            , this.recarga();
      });

    }
  
  
      //actualizacion filtro busqueda
      updateFilter(event) {
        console.log(event);
        const val = event.target.value.toLowerCase();
        const temp = this.temp.filter(function (d) {
          return d._hostname.toLowerCase().indexOf(val) !== -1 || d.DOMAIN.toLowerCase().indexOf(val) !== -1 || d.SUBSYSTEM.toLowerCase().indexOf(val) !== -1 || !val;
        });
        // actualizamos las rows
        this.rows = temp;
        // Cuando cambie el filtro, regresa a la primera página.
        this.table.offset = 0;
      }
  


      //eliminar registro      
      borrarRegistro(registro: Inventario, i: string) {

        Swal.fire({
          title: `¿Desea borrar el registro número ${registro.id_inventario}`,
          text: 'Confirme si desea borrar el registro',
          icon: 'question',
          showConfirmButton: true,
          showCancelButton: true
        }).then(respuesta => {
          if (respuesta.value) {
            this.datosborrado = JSON.stringify({ "id_inventario": registro.id_inventario });
            this.homeServicio.delete(this.datosborrado).subscribe();

            Swal.fire({
              title: registro.id_inventario,
              text: 'Registro eliminado',
              icon: 'success',
              showConfirmButton: false
            })
              , this.recarga();

          }
        });
      }



}
