import { Component, OnInit } from '@angular/core';
import { CoinSupply } from '../block';
import { ApiService } from '../../../../services/api/api.service';

@Component({
  selector: 'app-coin-supply',
  templateUrl: './coin-supply.component.html',
  styleUrls: ['./coin-supply.component.css']
})
export class CoinSupplyComponent implements OnInit {

  coinSupply: number;
  coinCap: number;

  constructor(
    private api: ApiService
  ) {
    this.coinSupply = this.coinCap = 0;
  }

  ngOnInit() {
    this.api.getCoinSupply().subscribe((supply: CoinSupply) => {
      this.coinCap = supply.coinCap;
      this.coinSupply = supply.coinSupply;
    })
  }
}
