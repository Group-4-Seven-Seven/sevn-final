import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { ProductComponent } from './pages/product/product.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AdminItemComponent } from './components/admin-item/admin-item.component';
import { AdminDashboardItemComponent } from './components/admin-dashboard-item/admin-dashboard-item.component';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { AdminRoutingModule } from './admin-routing.module';
import { ProductFormComponent } from './pages/product-form/product-form.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { MaterialDesignModule } from '../material-design.module';




@NgModule({
  declarations: [
    AdminDashboardComponent,
    ProductComponent,
    AdminComponent,
    AdminItemComponent,
    AdminDashboardItemComponent,
    ProductItemComponent,
    ProductFormComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    MaterialDesignModule
    
  ],
  exports:[
    AdminDashboardComponent,
    AdminComponent,
    ProductComponent,
    ProductFormComponent,
   

  ]
})
export class AdminModule { }
