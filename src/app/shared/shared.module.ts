import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommandBarComponent } from './command-bar/command-bar.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { RouterModule } from '@angular/router';
import { MaterialDesignModule } from '../material-design.module';
import { FilterPipe } from './filter/filter.pipe';
import { FormsModule } from '@angular/forms';
import { SortPipe } from './filter/sort.pipe';



@NgModule({
  declarations: [
    CommandBarComponent,
    NavBarComponent,
    FilterPipe,
    SortPipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialDesignModule,
    FormsModule
  ],
  exports : [CommandBarComponent, NavBarComponent, FilterPipe, SortPipe]

})
export class SharedModule { }
