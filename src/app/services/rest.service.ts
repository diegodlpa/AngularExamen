import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class RestService {
  url = "https://reqres.in/api/"
  constructor(private http: HttpClient) { }


  obtenerpaginaLista(pagina)
  {
    return this.http.get(`${this.url}users?page=${pagina}`)
  }

  verUsuario(usuario)
  {
    return this.http.get(`${this.url}users/${usuario}`)
  }
  editarUsuario(id,usuario){
    return this.http.put(`${this.url}users/${id}`, usuario).subscribe();
  }
}
