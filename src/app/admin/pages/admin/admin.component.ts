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
  tempUsers : any[]=[]
  tempUserID: any[] = []
  tempStatuses : any[] =[]
  constructor(private adminService : AdminService) { }

  ngOnInit(): void {
    //getting the active status and details of the registered users
    let res1 = this.adminService.getUserStatus()
    let res2 = this.adminService.getUsers()
    forkJoin([res1, res2]).subscribe((data:any)=>{
      this.tempStatuses = data[0]
  
      this.tempUsers = data[1]
      //to avoid showing the admin account 
      this.tempUsers.forEach((data)=>{
        if(data.userType != "admin"){
          this.users.push(data)
          this.tempUserID.push(data.id)  
        }
      })
      console.log(this.users)
      //to avoid showing the status of the admin account
      this.tempStatuses.forEach((data)=>{
        this.tempUserID.forEach((userID)=>{
          if(data.id == userID){
            this.statuses.push(data)
          }
        })
      })
      console.log(this.statuses)
    })
  }
  //getting the user from the child and setting it to this.user
  getUser(user:User){
    this.user = user
  }

  //changing the active status of the user
  changeActiveStatus(active:any){
    console.log(active)
    this.adminService.changeActiveStatus(active, this.user!).subscribe()
  }
}
