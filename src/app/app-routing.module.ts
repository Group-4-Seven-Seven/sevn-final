import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { RoleGuard } from './core/guards/role.guard';
import { UserRoleGuard } from './core/guards/user-role.guard';
import { MainhomeComponent } from './homepage/mainhome/mainhome.component';
import { LoginComponent } from './login/pages/login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';



const routes : Routes = [
  {
    path : "",
    redirectTo: "login",
    pathMatch: "full"
  },
  {
    path: "login",
    loadChildren: () => import("./login/login.module").then(m => m.LoginModule),
    
  },
  {
    path: "signup",
    loadChildren: () => import("./signup/signup.module").then(m => m.SignupModule)
  },
  {
    path: "user",
    loadChildren: () => import("./user/user.module").then(m => m.UserModule),
    // canActivate: [AuthGuard, UserRoleGuard]
  },
  {
    path : "admin",
    loadChildren: () => import("./admin/admin.module").then(m => m.AdminModule),
    // canActivate: [AuthGuard, RoleGuard]
  },
  {
    path: "home",
    component: MainhomeComponent
  },
  {path: '**',
   component: PageNotFoundComponent
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
