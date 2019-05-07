import { Injectable } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { ReplaySubject } from 'rxjs';

import { languageConfig } from 'app/app.config';

export class LanguageData {
  code: string;
  name: string;
  iconName: string;

  constructor(langObj) {
    Object.assign(this, langObj);
  }
}

@Injectable()
export class LanguageService {
  currentLanguage = new ReplaySubject<LanguageData>();

  private readonly storageKey = 'lang';

  private languagesInternal: LanguageData[] = [];
  get languages(): LanguageData[] {
    return this.languagesInternal;
  }

  constructor(
    private translate: TranslateService
  ) {
    this.loadLanguageSettings();
  }

  loadLanguageSettings() {
    const langs: string[] = [];
    languageConfig.languages.forEach(lang => {
      const LangObj = new LanguageData(lang);
      this.languagesInternal.push(LangObj);
      langs.push(LangObj.code);
    });

    this.translate.addLangs(langs);
    this.translate.setDefaultLang(languageConfig.defaultLanguage);

    this.translate.onLangChange
      .subscribe((event: LangChangeEvent) => this.onLanguageChanged(event));

    this.loadCurrentLanguage();
  }

  changeLanguage(langCode: string) {
    this.translate.use(langCode);
  }

  private onLanguageChanged(event: LangChangeEvent) {
    this.currentLanguage.next(this.languages.find(val => val.code === event.lang));
    localStorage.setItem(this.storageKey, event.lang);
  }

  private loadCurrentLanguage() {
    const storedLang = localStorage.getItem(this.storageKey);
    const currentLang = !!storedLang ? storedLang : languageConfig.defaultLanguage;
    this.translate.use(currentLang);
  }
}
