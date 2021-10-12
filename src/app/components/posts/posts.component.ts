import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { data } from 'src/app/models/data.model';
import { RestService } from 'src/app/services/rest.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  public id: number;
  public servicio$: Subscription
  public post: any
  info = new data
  constructor(private route: ActivatedRoute, private servicio: RestService) { 
    this.route.params.subscribe(params => {
      this.id = params['id'];
      console.log(this.id);
      this.verPosts()
  });
}

  ngOnInit(): void {
    this.verUsuario()

    //subscripcion real time update RXJS
   this.servicio$ = this.servicio.refresh$.subscribe(() => {
    this.verPosts()
   })
    
  }
  eliminarPost(id)
  {
    Swal.fire({
      title: `Desea eliminar el post con id ${id}`,
      text: "Esta accion no se puede revertir",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.servicio.eliminarPost(id)
        Swal.fire(
          'Eliminado!',
          'Post Eliminado',
          'success'
        )
        
      }
    })
    
    
  } 
  verPosts()
  {
    this.servicio$ = this.servicio.verUserPosts(this.id).subscribe((resp:any) => {
      console.log(resp);
      this.post = resp
    })
  }

  verUsuario()
  {
   this.servicio$ = this.servicio.verUsuario(this.id).subscribe( (resp:any) => {
      
      this.info = resp.data
    })
  }

}
