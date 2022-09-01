import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { User } from 'src/app/user/models/user';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  public users : any[] = []
  public statuses : any[]=[]
  user : User | undefined
  constructor(private adminService : AdminService) { }

  ngOnInit(): void {
    let res1 = this.adminService.getUserStatus()
    let res2 = this.adminService.getUsers()
    forkJoin([res1, res2]).subscribe((data:any)=>{
      
      this.statuses = data[0]
      this.users = data[1]
      console.log(this.statuses)

    })
  }

  getUser(user:User){
    this.user = user
  }
  changeActiveStatus(active:any){
    console.log(active)
    this.adminService.changeActiveStatus(active, this.user!).subscribe()
    

  }
}
