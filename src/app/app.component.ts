import { Component } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError, Event as RouterEvent } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { HeaderConfig, FooterConfig } from 'app/app.config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  headerConfig = HeaderConfig;
  footerConfig = FooterConfig;

  constructor(private router: Router, translate: TranslateService) {

    // Fallback.
    translate.setDefaultLang('en');
    // Lang to use.
    translate.use('en');

    router.events.subscribe((event: RouterEvent) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });
  }
}
