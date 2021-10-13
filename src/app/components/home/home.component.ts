import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { data } from 'src/app/models/data.model';
import { RestService } from 'src/app/services/rest.service';
import Swal from 'sweetalert2'
import {  MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements MatPaginatorIntl, OnInit {
  
  page_number = 1
  total = 0
  page_size = 0
  servicio$: Subscription
  breakpoint: number;
  //variable para desplegar la informacion en el form
  info = new data
  //variable para desplegar la informacion en las cards
  datos: any
  constructor(private servicio:RestService, private router: Router) {
    
   }
  changes: Subject<void>;
  itemsPerPageLabel: string;
  nextPageLabel: 'Next page';
  previousPageLabel: 'Previous page';
  firstPageLabel: string;
  lastPageLabel: string;
  getRangeLabel: (page: number, pageSize: number, length: number) => string;

  ngOnInit(): void {

    this.breakpoint = (window.innerWidth <= 786) ? 1 : 3;
      this.obtenerlista(this.page_number)
      
    
  }
  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 786) ? 1 : 3;
  }
  
  
  editarUsuario(id){
    Swal.fire({
      title: '¿Editar informacion del usuario?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: `Editar`,
      denyButtonText: `No Editar`,
    }).then((result) => {
      if (result.isConfirmed) {
       
        Swal.fire('Editado!', '', 'success')
        setTimeout(() => {
          this.servicio.editarUsuario(id, this.info)
        }, 1000);
      } else if (result.isDenied) {
        Swal.fire('El usuario no fue editado', '', 'info')
        setTimeout(() => {

        }, 1000);
        
      }
    })
    
    
  }
  cambiarPagina(event: PageEvent)
  {
    
    this.page_size = event.pageSize
    this.page_number = event.pageIndex + 1
    
    
    
    this.obtenerlista(this.page_number)
  }

  obtenerlista(pag)
  {
    this.servicio$ = this.servicio.obtenerpaginaLista(pag).subscribe( (resp:any) => {
      console.log(resp);
      
      
      this.total = resp.total
      this.page_size = resp.per_page
       this.datos = resp.data

       
       
    })
  }
  verUsuario(id, drawer)
  {
    drawer.toggle();
    this.servicio.verUsuario(id).subscribe( (resp:any) => {
      
      this.info = resp.data
      
      
    })
  }

}
