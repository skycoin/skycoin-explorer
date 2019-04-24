import { Component, OnDestroy, HostListener } from '@angular/core';

import { LanguageService, LanguageData } from '../../../services/language/language.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-language-selection',
  templateUrl: './language-selection.component.html',
  styleUrls: ['./language-selection.component.scss']
})
export class LanguageSelectionComponent implements OnDestroy {
  langs: LanguageData[];
  language: LanguageData;
  showLangs = false;

  private subscription: Subscription;
  private clickedInside = false;

  constructor(
    private languageService: LanguageService,
  ) {
    this.langs = languageService.languages;

    this.subscription = this.languageService.currentLanguage.subscribe(lang => this.language = lang);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  langsButtonClick() {
    this.showLangs = !this.showLangs;
  }

  changeLanguage(language: LanguageData) {
    this.languageService.changeLanguage(language.code);
    this.showLangs = false;
  }

  @HostListener('click')
  clickInside() {
    this.clickedInside = true;
  }

  @HostListener('document:click')
  clickout() {
    if (!this.clickedInside) {
      this.showLangs = false;
    }
    this.clickedInside = false;
  }
}
