import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CoreUserService } from '../../../core/services/core-user.service';
import { User } from '../../models/user';
import { SharedService } from 'src/app/shared/shared.service';

interface Gender {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  formValue!: FormGroup;
  userData!: any;
  firstName: string = '';
  lastName: string = '';
  genDer: string = '';
  eMail: string = '';
  account: any;
  public user: User[] = [];

  constructor(
    private formbuilder: FormBuilder,
    private userCartService: UserService,
    private coreUserService: CoreUserService,
    private sharedService : SharedService
  ) {}

  ngOnInit(): void {
    this.sharedService.show();
    
    this.account = localStorage.getItem('account');
    if (this.account) {
      this.userCartService.getUser(this.account).subscribe((data) => {
        this.user = data;
        console.log(this.user);
      });
    }
  }
  getUserName() {
    this.userCartService.getUserDetails().subscribe((data: any) => {
      console.log(data);
      this.firstName = data.firstname;
      this.lastName = data.lastname;
      this.eMail = data.email;
      this.genDer = data.gender;
    });
  }

  selectedValue!: string;
  genders: Gender[] = [
    {value: 'male', viewValue: 'Male'},
    {value: 'female', viewValue: 'Female'},
    {value: 'undefined', viewValue: 'Undefined'},
  ];
}
