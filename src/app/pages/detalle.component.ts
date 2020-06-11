import { Component, OnInit } from '@angular/core';
import { HomeService } from '../services/home.service';
import { Inventario } from '../models/inventario';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Constantes } from '../models/constantes.model';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DataserviceService } from '../services/dataservice.service';
import { Personas } from '../models/personas';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html'
})
export class DetalleComponent implements OnInit {


  registro: Inventario = new Inventario();

  user:Personas = new Personas();
  isSubmitted = false;

  public Editor = ClassicEditor;
  datosborrado: string;
  public onReady(editor) {
    editor.ui.getEditableElement().parentElement.insertBefore(
      editor.ui.view.toolbar.element,
      editor.ui.getEditableElement()

    );
  }

  formularioInventario = new FormGroup({
    id_inventario      : new FormControl(''),
    tokenid            : new FormControl(''),
    _hostname          : new FormControl(''),
    _timestamp         : new FormControl(''),
    _session_ID        : new FormControl(''),
    _infotype          : new FormControl(''),
    _key               : new FormControl(''),
    FQDN               : new FormControl(''),
    DOMAIN             : new FormControl(''),
    OS_VERSION         : new FormControl(''),
    OS_KERNEL          : new FormControl(''),
    OS_ARCHITECTURE    : new FormControl(''),
    SYS_VENDOR         : new FormControl(''),
    SYS_PRODUCT_NAME   : new FormControl(''),
    SYS_PRODUCT_VERSION: new FormControl(''),
    CPU_NUMBERS        : new FormControl(''),
    CPU_MODEL          : new FormControl(''),
    CPU_SPEED          : new FormControl(''),
    CPU_CORES          : new FormControl(''),
    CPU_THREADS        : new FormControl(''),
    IP_LIST            : new FormControl(''),
    MAC_LIST           : new FormControl(''),
    MEM_TOTAL          : new FormControl(''),
    UPTIME_TIMESTAMP   : new FormControl(''),
    UPTIME_DAYS        : new FormControl(''),
    DISK_LIST          : new FormControl(''),
    LAST_FIX           : new FormControl(''),
    SERIAL_NUM           : new FormControl(''),
    ROLE               : new FormControl(''),
    SUBSYSTEM          : new FormControl('')
  });

  PHP_API_SERVER = Constantes.API_SERVER; //URL del servicio

  constructor(private httpClient: HttpClient, private homeService: HomeService,
    private activatedRoute: ActivatedRoute, private router: Router, private fb: FormBuilder,private dataService: DataserviceService) {
    this.recibirDetalle();
  }

  ngOnInit(): void {
    this.getUsuario();
  }


  getUsuario(){  
    const id_persona = localStorage.getItem('id_persona');  
    this.dataService.getUserId ( id_persona )
      .subscribe( (resp:Personas) => {
        this.user = resp;
      });
  }

  recibirDetalle() {
    const tokenid = this.activatedRoute.snapshot.paramMap.get('tokenid');
    this.homeService.getDetalleInventario(tokenid)
      .subscribe((respuesta: Inventario) => {
        this.registro = respuesta;
        this.registro.tokenid = tokenid;

        this.formularioInventario = this.fb.group({
          id_inventario      :[this.registro.id_inventario, Validators.required],
          tokenid            :[this.registro.tokenid, Validators.required],
          _hostname          :[this.registro._hostname          ],
          _timestamp         :[this.registro._timestamp         ],
          _session_ID        :[this.registro._session_ID        ],
          _infotype          :[this.registro._infotype          ],
          _key               :[this.registro._key               ],
          FQDN               :[this.registro.FQDN               ],
          DOMAIN             :[this.registro.DOMAIN             ],
          OS_VERSION         :[this.registro.OS_VERSION         ],
          OS_KERNEL          :[this.registro.OS_KERNEL          ],
          OS_ARCHITECTURE    :[this.registro.OS_ARCHITECTURE    ],
          SYS_VENDOR         :[this.registro.SYS_VENDOR         ],
          SYS_PRODUCT_NAME   :[this.registro.SYS_PRODUCT_NAME   ],
          SYS_PRODUCT_VERSION:[this.registro.SYS_PRODUCT_VERSION],
          CPU_NUMBERS        :[this.registro.CPU_NUMBERS        ],
          CPU_MODEL          :[this.registro.CPU_MODEL          ],
          CPU_SPEED          :[this.registro.CPU_SPEED          ],
          CPU_CORES          :[this.registro.CPU_CORES          ],
          CPU_THREADS        :[this.registro.CPU_THREADS        ],
          IP_LIST            :[this.registro.IP_LIST            ],
          MAC_LIST           :[this.registro.MAC_LIST           ],
          MEM_TOTAL          :[this.registro.MEM_TOTAL          ],
          UPTIME_TIMESTAMP   :[this.registro.UPTIME_TIMESTAMP   ],
          UPTIME_DAYS        :[this.registro.UPTIME_DAYS        ],
          DISK_LIST          :[this.registro.DISK_LIST          ],
          LAST_FIX           :[this.registro.LAST_FIX           ],
          SERIAL_NUM           :[this.registro.SERIAL_NUM       ],
          ROLE               :[this.registro.ROLE         ],
          SUBSYSTEM          :[this.registro.SUBSYSTEM       ]  
 
        });

      });
  }



  recarga() {
    location.reload();
  }


  onSubmit() {
    this.isSubmitted = true;
    const valor = JSON.stringify(this.formularioInventario.value);

    this.homeService.updateRegistro(valor).subscribe(respuesta => {
      Swal.fire({
        title: 'Registro actualizado',
        text: 'El registro ha sido modificado con éxito',
        icon: 'success',
        showConfirmButton: true
      })
        , this.recarga();

    });
  }

  get id_inventario() { return this.formularioInventario.get('id_inventario'); }
  get tokenid() { return this.formularioInventario.get('tokenid'); }


  //eliminar registro      
  borrarRegistro(registro: Inventario, id_inventario: string) {

    Swal.fire({
      title: `¿Desea borrar el registro?`,
      text: 'Confirme si desea borrar el registro',
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true

    }).then(respuesta => {
      if (respuesta.value) {
        this.datosborrado = JSON.stringify({ "id_inventario": id_inventario });
        this.homeService.delete(this.datosborrado).subscribe();

        Swal.fire({
          title: registro.id_inventario,
          text: 'Registro eliminado',
          icon: 'success',
          showConfirmButton: false
        }), this.recarga();

      }
    });
  }






}
