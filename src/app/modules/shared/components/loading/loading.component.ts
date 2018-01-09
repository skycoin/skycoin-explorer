import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {
    
    @Input() name: string;
    @Input() size: string;
    @Input() fixed: boolean;
    @Input() animation: string;
    @Input() rotate: number | string;
    @Input() inverse: boolean;

  constructor(
  ) {
      this.name = "spinner";
      this.size = "lg";
      this.fixed = false;
      this.animation = "spin";
      this.rotate = 360;
      this.inverse = false;
  }

  ngOnInit() {
  }
}
