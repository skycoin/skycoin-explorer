import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ApiService } from '../../../services/api/api.service';

declare var QRCode: any;

@Component({
  selector: 'app-address-detail',
  templateUrl: './address-detail.component.html',
  styleUrls: ['./address-detail.component.css']
})
export class AddressDetailComponent implements OnInit {

  UxOutputs: Observable<any>;

  transactions: any[];

  currentAddress: string;

  currentBalance: number;

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.UxOutputs = null;
    this.currentBalance = 0;
    this.transactions = [];
    this.currentAddress = null;
  }

  ngOnInit() {

  }

  ngAfterViewInit(){
    this.UxOutputs = this.route.params
      .switchMap((params: Params) => {
        let address = params['address'];
        this.currentAddress = address;
        let qrcode = new QRCode("qr-code");
        qrcode.makeCode(this.currentAddress);
        return this.api.getUxOutputsForAddress(address);
      });

    this.UxOutputs.subscribe((uxoutputs) => {
      this.transactions = uxoutputs;
      console.log(uxoutputs);
    });

    this.route.params
      .switchMap((params: Params) => {
        let address = params['address'];
        return this.api.getCurrentBalanceOfAddress(address);
      }).subscribe((addressDetails) => {
      if (addressDetails.head_outputs.length > 0) {
        for (var i = 0; i < addressDetails.head_outputs.length;i++) {
          this.currentBalance = this.currentBalance + parseInt(addressDetails.head_outputs[i].coins);
        }
      }
    });
  }
}
