import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard-item',
  templateUrl: './admin-dashboard-item.component.html',
  styleUrls: ['./admin-dashboard-item.component.scss']
})
export class AdminDashboardItemComponent implements OnInit {
  @Input() item: any
  constructor() { }

  ngOnInit(): void {
  }

}
