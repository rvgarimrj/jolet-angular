import { MaterializeAction } from 'angular2-materialize';
import { Component, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {
  public drop: boolean = true;
    dropdownActions = new EventEmitter<string|MaterializeAction>();

    
  constructor() { }

  ngOnInit() {
  }
  toggle() {
      this.drop = !this.drop;
      if (this.drop) {
        this.dropdownActions.emit({action:"dropdown",params:null});
      }
    }
}
