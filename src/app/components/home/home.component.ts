import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { data } from 'src/app/services/models/data.model';
import { RestService } from 'src/app/services/rest.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  pagina = 1
  total = 0
  porpagina = 0
  //variable para desplegar la informacion en el form
  info = new data
  //variable para desplegar la informacion en las cards
  datos: any
  constructor(private servicio:RestService, private router: Router) {
    
   }

  ngOnInit(): void {

   
      this.obtenerlista(this.pagina)
      
    
  }

  
  editarUsuario(id){
    this.servicio.editarUsuario(id, this.info)
    
  }
  cambiarPagina()
  {
    this.pagina += 1
    
    console.log(this.pagina);
    this.obtenerlista(this.pagina)
  }

  obtenerlista(pag)
  {
    this.servicio.obtenerpaginaLista(pag).subscribe( (resp:any) => {
      
      this.total = resp.total_pages
      this.porpagina = resp.per_page
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
