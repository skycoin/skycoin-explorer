import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

    links = [
        {
            href: 'https://medium.com/@Skycoinproject',
            img: 'medium.svg',
        },
        {
            href: 'https://twitter.com/skycoinproject',
            img: 'twitter.svg',
        },
        {
            href: 'https://www.facebook.com/SkycoinOfficial',
            img: 'facebook.svg',
        },
        {
            href: 'https://www.instagram.com/skycoinproject/',
            img: 'instagram.svg',
        },
        {
            href: 'https://github.com/skycoin/skycoin',
            img: 'github.svg',
        },
        {
            href: 'https://www.youtube.com/c/Skycoin',
            img: 'youtube.svg',
        },
        {
            href: 'https://www.reddit.com/r/skycoin',
            img: 'reddit.svg',
        },
        {
            href: 'https://itunes.apple.com/nl/podcast/skycoin/id1348472259?l=en',
            img: 'apple.svg',
        },
        {
            href: 'https://discord.gg/EgBenrW',
            img: 'discord.svg',
        },
        {
            href: 'https://t.me/Skycoin',
            img: 'telegram.svg',
        },
        {
            href: 'https://www.linkedin.com/company/skycoin/',
            img: 'linkedin.svg',
        }
    ];

  constructor() { }

  ngOnInit() {
  }

}
