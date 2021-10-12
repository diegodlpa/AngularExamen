import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PostsComponent } from './components/posts/posts.component';
import { GuardGuard } from './services/guard.guard';

const routes: Routes = [
  {path:'home', component:HomeComponent,  canActivate: [GuardGuard]},
  {path:'login', component: LoginComponent},
  {path:'posts/:id', component: PostsComponent, canActivate: [GuardGuard]},
  {path : '', pathMatch: 'full', redirectTo: 'home', canActivate: [GuardGuard]},
  {path : '**', pathMatch: 'full', redirectTo: 'home', canActivate: [GuardGuard]}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
