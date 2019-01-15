import {Component, Input, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import disableScroll from 'disable-scroll';
import menu from './menu';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() menuVisible: boolean;
  menu:any;
  
  constructor(
    public router: Router,
  ) {  
    this.setupMenu();
  }

  private setupMenu(){
    this.menu = menu;
  }

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
      this.setupMenu();
  }

  onCLickMenuDropdown(item){
    this.menu = this.menu.map((i)=>{
      if(i===item){
        i.open = !i.open;
      }
      return i;
    })

  }
}
