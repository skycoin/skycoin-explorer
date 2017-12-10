import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { AppComponent } from './app.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { SearchBarComponent } from './components/layout/search-bar/search-bar.component';
import { LoadingComponent } from './components/layout/loading/loading.component';
import { BlocksComponent } from './components/pages/blocks/blocks.component';
import { ApiService } from './services/api/api.service';
import { HttpModule } from '@angular/http';
import { BlockDetailsComponent } from './components/pages/block-details/block-details.component';
import { TransactionDetailComponent } from './components/pages/transaction-detail/transaction-detail.component';
import { AddressDetailComponent } from './components/pages/address-detail/address-detail.component';
import { TransactionsValuePipe } from './pipes/transactions-value.pipe';
import { ExplorerService } from './services/explorer/explorer.service';
import { QrCodeComponent } from './components/layout/qr-code/qr-code.component';


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
    AddressDetailComponent,
    AppComponent,
    BlockDetailsComponent,
    BlocksComponent,
    FooterComponent,
    HeaderComponent,
    LoadingComponent,
    QrCodeComponent,
    SearchBarComponent,
    TransactionDetailComponent,
    TransactionsValuePipe,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    NgxDatatableModule,
    RouterModule.forRoot(ROUTES),
  ],
  providers: [
    ApiService,
    ExplorerService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
