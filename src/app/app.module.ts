import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { SearchBarComponent } from './components/layout/search-bar/search-bar.component';
import { LoadingComponent } from './components/layout/loading/loading.component';
import { BlocksComponent } from './components/pages/block-chain-table/blocks.component';
import { ApiService } from './services/api/api.service';
import { HttpModule } from '@angular/http';
import { PaginationComponent } from './components/pages/block-chain-table/pagination/pagination.component';
import { CoinSupplyComponent } from './components/pages/block-chain-table/coin-supply/coin-supply.component';
import { BlockDetailsComponent } from './components/pages/block-details/block-details.component';
import { TransactionDetailComponent } from './components/pages/transaction-detail/transaction-detail.component';
import { AddressDetailComponent } from './components/pages/address-detail/address-detail.component';
import { TransactionCardComponent } from './components/layout/transaction-card/transaction-card.component';

const ROUTES = [
  {
    path: '',
    redirectTo: 'app/blocks',
    pathMatch: 'full'
  },
  {
    path: 'app/blocks',
    component: BlocksComponent
  },
  {
    path: 'app/block/:id',
    component: BlockDetailsComponent
  },
  {
    path: 'app/address/:address',
    component: AddressDetailComponent
  },
  {
    path: 'app/transaction/:txid',
    component: TransactionDetailComponent
  }
  ,
];

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    BlocksComponent,
    SearchBarComponent,
    LoadingComponent,
    PaginationComponent,
    CoinSupplyComponent,
    BlockDetailsComponent,
    TransactionDetailComponent,
    AddressDetailComponent,
    TransactionCardComponent,
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
