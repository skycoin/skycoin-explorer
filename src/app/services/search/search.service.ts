import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ExplorerService } from '../explorer/explorer.service';

@Injectable()
export class SearchService {

  constructor(
    private explorer: ExplorerService,
  ) { }

  getResultNavCommands(searchTerm: string): ResultNavCommandsResponse {
    const response = new ResultNavCommandsResponse();
    searchTerm = encodeURIComponent(searchTerm);

    if (searchTerm.length >= 27 && searchTerm.length <= 35) {
      response.resultNavCommands = Observable.of(['/app/address', searchTerm]);
    } else if (searchTerm.length === 64) {
      response.resultNavCommands = this.explorer.getBlockByHash(searchTerm)
        .map(block => ['/app/block', block.id.toString()])
        .catch((error: any) => {
          if (error && error.status && error.status == 404) {
            return Observable.of(['/app/transaction', searchTerm]);
          } else {
            return Observable.throw(error);
          }
        });
    } else {
      if (parseInt(searchTerm, 10).toString() == searchTerm && parseInt(searchTerm, 10) >= 0) {
        response.resultNavCommands = Observable.of(['/app/block', searchTerm]);
      } else {
        response.error = SearchError.InvalidSearchTerm;
      }
    }

    return response;
  }

}

export class ResultNavCommandsResponse {
  resultNavCommands: Observable<string[]>;
  error: SearchError;
}

export enum SearchError {
  InvalidSearchTerm = 1,
}