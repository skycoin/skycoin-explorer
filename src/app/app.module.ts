import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { SearchBarComponent } from './components/layout/search-bar/search-bar.component';
import { LoadingComponent } from './components/layout/loading/loading.component';
import { BlocksComponent } from './components/pages/blocks/blocks.component';
import { UnconfirmedTransactionsComponent } from './components/pages/unconfirmed-transactions/unconfirmed-transactions.component';
import { ApiService } from './services/api/api.service';
import { HttpModule } from '@angular/http';
import { BlockDetailsComponent } from './components/pages/block-details/block-details.component';
import { TransactionDetailComponent } from './components/pages/transaction-detail/transaction-detail.component';
import { AddressDetailComponent } from './components/pages/address-detail/address-detail.component';
import { TransactionsValuePipe } from './pipes/transactions-value.pipe';
import { ExplorerService } from './services/explorer/explorer.service';
import { QrCodeComponent } from './components/layout/qr-code/qr-code.component';
import { FormsModule } from '@angular/forms';
import { RichlistComponent } from 'app/components/pages/richlist/richlist.component';


const ROUTES = [
  {
    path: '',
    redirectTo: 'app/blocks/1',
    pathMatch: 'full'
  },
  {
    path: 'app/blocks',
    component: BlocksComponent
  },
  {
    path: 'app/blocks/:page',
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
  },
  {
    path: 'app/unconfirmedtransactions',
    component: UnconfirmedTransactionsComponent
  },
  {
    path: 'app/richlist',
    component: RichlistComponent
  },
];

@NgModule({
  declarations: [
    AddressDetailComponent,
    AppComponent,
    BlockDetailsComponent,
    BlocksComponent,
    UnconfirmedTransactionsComponent,
    FooterComponent,
    HeaderComponent,
    LoadingComponent,
    QrCodeComponent,
    SearchBarComponent,
    TransactionDetailComponent,
    TransactionsValuePipe,
    RichlistComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES),
  ],
  providers: [
    ApiService,
    ExplorerService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
