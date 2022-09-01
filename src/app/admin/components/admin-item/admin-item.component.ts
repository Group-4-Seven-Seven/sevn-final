import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-admin-item',
  templateUrl: './admin-item.component.html',
  styleUrls: ['./admin-item.component.scss']
})
export class AdminItemComponent implements OnInit {
  @Input() user : any
  
  @Input() status : any
  @Output() activeActionEmitter = new EventEmitter()
  @Output() userActionEmitter = new EventEmitter()
  activeFlag = true
  constructor() { }

  ngOnInit(): void {
    
  }

  activateUser(){
    
    this.status = !this.status
    const active = {
      active : this.status
    }
    this.userActionEmitter.emit(this.user)
    this.activeActionEmitter.emit(active)
    
  }

  deactivateUser(){
    this.status = !this.status
    const active = {
      active : this.status
    }

    this.userActionEmitter.emit(this.user)
    this.activeActionEmitter.emit(active)
    
  }
}
