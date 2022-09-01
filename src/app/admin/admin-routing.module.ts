import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { AdminComponent } from './pages/admin/admin.component';
import { ProductComponent } from './pages/product/product.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';
import { RoleGuard } from '../core/guards/role.guard';
import { ProductFormComponent } from './pages/product-form/product-form.component';

const routes : Routes = [
  {
    path: "",
    component: AdminComponent,
   
  },
  {
    path: "dashboard",
    component: AdminDashboardComponent,
    
  },
  {
    path: "product",
    component: ProductComponent,
    
  },
  {
    path: "form",
    component: ProductFormComponent
  }
    
 
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
