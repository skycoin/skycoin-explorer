import { Component, OnInit } from '@angular/core';
import { CoinSupply } from '../block';
import { ApiService } from '../../../../services/api/api.service';

@Component({
  selector: 'app-coin-supply',
  templateUrl: './coin-supply.component.html',
  styleUrls: ['./coin-supply.component.css']
})
export class CoinSupplyComponent implements OnInit {

  currentSupply: number;
  totalSupply: number;

  constructor(
    private api: ApiService
  ) {
    this.currentSupply = this.totalSupply = 0;
  }

  ngOnInit() {
    this.api.getCoinSupply().subscribe((supply: CoinSupply) => {
      this.currentSupply = supply.current_supply;
      this.totalSupply = supply.total_supply;
    })
  }
}
