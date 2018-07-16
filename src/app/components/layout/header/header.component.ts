import {Component, Input, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import disableScroll from 'disable-scroll';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() menuVisible: boolean;
  constructor(
    public router: Router,
  ) {  }

  ngOnInit() {
      this.menuVisible = false;
  }

  toggleMenu(value) {
      this.menuVisible = value;

      if (value) {
          disableScroll.on();
      } else {
          disableScroll.off();
      }
  }
}
