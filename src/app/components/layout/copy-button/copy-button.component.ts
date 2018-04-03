import { Component, Input, OnInit, HostBinding } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { AnimationEvent } from '@angular/animations/src/animation_event';

@Component({
  selector: 'copy-button',
  templateUrl: './copy-button.component.html',
  styleUrls: ['./copy-button.component.scss'],
  animations: [
    trigger('showMessage', [
      state('show', style({
        opacity: 1.0,
        transform: 'translateY(0px)'
      })),
      state('hide', style({
        opacity: 0.0,
        transform: 'translateY(-10px)'
      })),
      transition('void => hide', [
        style({
          opacity: 0,
          transform: 'translateY(0px)'
        }),
        animate('0ms 0ms')
      ]),
      transition('* => show', [
        style({
          opacity: 0.0,
          transform: 'translateY(10px)'
        }),
        animate('200ms 0ms ease-out')
      ]),
      transition('* => hide', [
        style({
          opacity: 1.0,
          transform: 'translateY(0px)'
        }),
        animate('200ms 500ms ease-in')
      ]),
    ])
  ]
})
export class CopyButtonComponent {

  private static showAnimName = 'show';
  private static hideAnimName = 'hide';

  animState = CopyButtonComponent.hideAnimName;
  showLabel = false;
  @Input() text: string;
  @HostBinding('attr.class') cssClass = 'copy-button'; 

  copy() {
    let tempElement = document.createElement('textarea');

    tempElement.style.position = 'fixed';
    tempElement.style.left = '1px';
    tempElement.style.top = '1px';
    tempElement.style.width = '1px';
    tempElement.style.height = '1px';
    tempElement.style.opacity = '0';
    tempElement.value = this.text;

    document.body.appendChild(tempElement);
    tempElement.focus();
    tempElement.select();

    document.execCommand('copy');
    document.body.removeChild(tempElement);

    this.animState = CopyButtonComponent.showAnimName;
    this.showLabel = true;
  }

  animationDone(event: AnimationEvent) {
    if (event.toState == CopyButtonComponent.showAnimName)
      this.animState = CopyButtonComponent.hideAnimName;
    else
      this.showLabel = false;
  }
}
