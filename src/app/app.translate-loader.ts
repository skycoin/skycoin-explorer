import { TranslateLoader } from '@ngx-translate/core';
import { Observable } from 'rxjs/Observable';

// Loads the translation files, with cache busting.
export class AppTranslateLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    return Observable.fromPromise(System.import(`../assets/i18n/${lang}.json`));
  }
}
