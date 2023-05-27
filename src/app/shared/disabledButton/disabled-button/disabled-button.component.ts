import { Component, Input } from '@angular/core';

@Component({
  selector: 'shared-disabled-button',
  templateUrl: './disabled-button.component.html',
  styleUrls: ['./disabled-button.component.css']
})
export class DisabledButtonComponent {
  @Input()
  message: string = "";
}
