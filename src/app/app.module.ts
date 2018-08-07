import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, RouteReuseStrategy } from '@angular/router';

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
import { UnspentOutputsComponent } from 'app/components/pages/unspent-outputs/unspent-outputs.component';
import { CopyButtonComponent } from 'app/components/layout/copy-button/copy-button.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppReuseStrategy } from 'app/app.reuse-strategy';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { AppTranslateLoader } from 'app/app.translate-loader';
import { GenericHeaderComponent } from 'app/components/layout/generic-header/generic-header.component';
import { GenericFooterComponent } from 'app/components/layout/generic-footer/generic-footer.component';
import { ExplorerDatePipe } from 'app/pipes/explorer-date.pipe';
import { DatePipe } from '@angular/common';
import { DateFormatterComponent } from 'app/components/layout/date-formatter/date-formatter.component';
import { SearchService } from './services/search/search.service';
import { SearchComponent } from './components/pages/search/search.component';


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
    redirectTo: 'app/address/:address/1',
    pathMatch: 'full'
  },
  {
    path: 'app/address/:address/:page',
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
  {
    path: 'app/unspent/:address',
    component: UnspentOutputsComponent
  },
  {
    path: 'app/search',
    redirectTo: 'app/blocks/1',
    pathMatch: 'full'
  },
  {
    path: 'app/search/:term',
    component: SearchComponent
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
    GenericFooterComponent,
    GenericHeaderComponent,
    LoadingComponent,
    QrCodeComponent,
    SearchBarComponent,
    TransactionDetailComponent,
    TransactionsValuePipe,
    RichlistComponent,
    UnspentOutputsComponent,
    CopyButtonComponent,
    ExplorerDatePipe,
    DateFormatterComponent,
    SearchComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useClass: AppTranslateLoader
      }
    })
  ],
  providers: [
    ApiService,
    ExplorerService,
    SearchService,
    {provide: RouteReuseStrategy, useClass: AppReuseStrategy},
    DatePipe,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
