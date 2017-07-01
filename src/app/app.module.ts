import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { SearchBarComponent } from './components/layout/search-bar/search-bar.component';
import { LoadingComponent } from './components/layout/loading/loading.component';
import { BlockChainTableComponent } from './components/pages/block-chain-table/block-chain-table.component';
import { ApiService } from './services/api/api.service';
import { HttpModule } from '@angular/http';
import { PaginationComponent } from './components/pages/block-chain-table/pagination/pagination.component';
import { CoinSupplyComponent } from './components/pages/block-chain-table/coin-supply/coin-supply.component';
import { BlockDetailsComponent } from './components/pages/block-details/block-details.component';
import { TransactionDetailComponent } from './components/pages/transaction-detail/transaction-detail.component';
import { AddressDetailComponent } from './components/pages/address-detail/address-detail.component';

const ROUTES = [
  {
    path: '',
    redirectTo: 'blocks',
    pathMatch: 'full'
  },
  {
    path: 'blocks',
    component: BlockChainTableComponent
  },
  {
    path: 'block/:id',
    component: BlockDetailsComponent
  },
  {
    path: 'address/:address',
    component: AddressDetailComponent
  },
  {
    path: 'transaction/:txid',
    component: TransactionDetailComponent
  }
  ,
];

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    BlockChainTableComponent,
    SearchBarComponent,
    LoadingComponent,
    PaginationComponent,
    CoinSupplyComponent,
    BlockDetailsComponent,
    TransactionDetailComponent,
    AddressDetailComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(ROUTES),
  ],
  providers: [
    ApiService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
