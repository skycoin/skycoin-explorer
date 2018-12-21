import { Component } from '@angular/core';
import { FooterConfig } from 'app/app.config';

@Component({
  selector: 'app-generic-footer',
  templateUrl: './generic-footer.component.html',
  styleUrls: ['./generic-footer.component.scss']
})
export class GenericFooterComponent {

  config = FooterConfig;

  constructor() { }

}
