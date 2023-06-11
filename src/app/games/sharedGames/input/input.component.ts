import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
})
export class InputComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() placeholder: string = "";

  @Output() onSearch: EventEmitter<string> = new EventEmitter<string>();

  searchGame(search: string) {
    this.onSearch.emit(search);
  }

}
