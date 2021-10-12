import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor(private loginservicio: LoginService, private router: Router) { }

  ngOnInit(): void {
  }
  logout() {
    this.loginservicio.logout();
    this.router.navigate(['/login']);
  }
  estaLogueado()
  {
    return this.loginservicio.estaLogueado();
  }
  refresh(): void {
    this.router.navigate(['/home'])
}
}
