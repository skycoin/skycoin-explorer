import { Component } from '@angular/core';
import { Router, NavigationEnd, Event as RouterEvent } from '@angular/router';
import { HeaderConfig, FooterConfig } from 'app/app.config';
import { LanguageService } from 'app/services/language/language.service';
import { ExplorerService } from 'app/services/explorer/explorer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  headerConfig = HeaderConfig;
  footerConfig = FooterConfig;

  constructor(router: Router, languageService: LanguageService, explorerService: ExplorerService) {
    router.events.subscribe((event: RouterEvent) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });
  }
}
