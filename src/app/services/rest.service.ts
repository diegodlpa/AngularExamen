import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class RestService {
  re = "https://reqres.in/api/"
  jp = "https://jsonplaceholder.typicode.com/"
  private _refresh$ = new Subject<void>()
  constructor(private http: HttpClient) { }

  get refresh$()
  {
    return this._refresh$
  }

  obtenerpaginaLista(pagina)
  {
    return this.http.get(`${this.re}users?page=${pagina}`)
  }
  verUsuario(usuario)
  {
    return this.http.get(`${this.re}users/${usuario}`)
  }
  editarUsuario(id,usuario){
    return this.http.put(`${this.re}users/${id}`, usuario).subscribe(() => {
      console.log("Editado correctamente");
    });
  }
  verUserPosts(id)
  {
    return this.http.get(`${this.jp}users/${id}/posts`)
  }
  eliminarPost(id)
  {
    //Uso de RXJS
    return this.http.delete(`${this.jp}posts/${id}`).pipe(
      tap(() => {
        this.refresh$.next()
      })
    )
  }
}
