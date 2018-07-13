import { Component, Input } from '@angular/core';

@Component({
  selector: 'date-formatter',
  templateUrl: './date-formatter.component.html',
  styleUrls: ['./date-formatter.component.scss']
})
export class DateFormatterComponent {
  @Input()date;

  @Input()dateMultiplier = 1000;
  
  constructor() { }
}
