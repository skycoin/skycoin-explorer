import { Component } from '@angular/core';
import { HeaderConfig } from 'app/app.config';

@Component({
  selector: 'generic-header',
  templateUrl: './generic-header.component.html',
  styleUrls: ['./generic-header.component.scss']
})
export class GenericHeaderComponent {
  
  config = HeaderConfig;
  
  constructor() { }
}
