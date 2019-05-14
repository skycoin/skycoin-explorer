import { throwError as observableThrowError, of as observableOf,  Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

import { ExplorerService } from '../explorer/explorer.service';

export class ResultNavCommandsResponse {
  resultNavCommands: Observable<string[]>;
  error: SearchError;
}

export enum SearchError {
  InvalidSearchTerm = 1,
}

@Injectable()
export class SearchService {

  constructor(
    private explorer: ExplorerService,
  ) { }

  getResultNavCommands(searchTerm: string): ResultNavCommandsResponse {
    const response = new ResultNavCommandsResponse();
    searchTerm = encodeURIComponent(searchTerm);

    if (searchTerm.length >= 27 && searchTerm.length <= 35) {
      response.resultNavCommands = observableOf(['/app/address', searchTerm]);
    } else if (searchTerm.length === 64) {
      response.resultNavCommands = this.explorer.getBlockByHash(searchTerm).pipe(
        map(block => ['/app/block', block.id.toString()]),
        catchError((error: any) => {
          if (error && error.status && error.status === 404) {
            return observableOf(['/app/transaction', searchTerm]);
          } else {
            return observableThrowError(error);
          }
        }));
    } else {
      if (parseInt(searchTerm, 10).toString() === searchTerm && parseInt(searchTerm, 10) >= 0) {
        response.resultNavCommands = observableOf(['/app/block', searchTerm]);
      } else {
        response.error = SearchError.InvalidSearchTerm;
      }
    }

    return response;
  }

}
