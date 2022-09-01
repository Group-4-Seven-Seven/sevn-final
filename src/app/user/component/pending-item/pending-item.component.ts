import { Component, Input, OnInit } from '@angular/core';
import { Pending } from '../../models/pending';

@Component({
  selector: 'app-pending-item',
  templateUrl: './pending-item.component.html',
  styleUrls: ['./pending-item.component.scss']
})
export class PendingItemComponent implements OnInit {
  @Input() pendingorder : Pending | undefined;
  
  constructor() { }

  ngOnInit(): void {
  }

}