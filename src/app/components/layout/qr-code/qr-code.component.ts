import { Component, Input, OnInit, ViewChild } from '@angular/core';

declare var QRCode: any;

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.css']
})
export class QrCodeComponent implements OnInit {
  @Input() string: string;
  @ViewChild('qr') qr: any;

  size = 130;
  level = 'M';
  colordark = '#000000';
  colorlight = '#ffffff';
  usesvg = false;

  ngOnInit() {
    new QRCode(this.qr.nativeElement, {
      text: this.string,
      width: this.size,
      height: this.size,
      colorDark: this.colordark,
      colorLight: this.colorlight,
      useSVG: this.usesvg,
      correctLevel: QRCode.CorrectLevel[this.level.toString()]
    });
  }
}
