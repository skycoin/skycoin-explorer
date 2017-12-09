import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ApiService } from '../../../services/api/api.service';

declare var QRCode: any;

@Component({
  selector: 'app-address-detail',
  templateUrl: './address-detail.component.html',
  styleUrls: ['./address-detail.component.css']
})
export class AddressDetailComponent implements OnInit {
  address: string;
  transactions = [];
  currentBalance: number;
  loading = false;

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.loading = true;

    this.route.params.switchMap((params: Params) => {
      this.address = params['address'];
      // const qrcode = new QRCode('qr-code');
      // qrcode.makeCode(this.address);
      return this.api.getUxOutputsForAddress(this.address);
    }).subscribe(data => {
      this.transactions = data;
      this.loading = false;
    });


    this.route.params.switchMap((params: Params) => this.api.getCurrentBalanceOfAddress(params['address']))
      .subscribe((addressDetails) => {
        if (addressDetails.head_outputs.length > 0) {
          for (let i = 0; i < addressDetails.head_outputs.length; i++) {
            this.currentBalance = this.currentBalance + parseInt(addressDetails.head_outputs[i].coins, 10);
          }
        }
      });
  }
}
