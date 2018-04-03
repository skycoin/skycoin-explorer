import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CopyButtonComponent } from './copy-button.component';

describe('CopyButtonComponent', () => {
  let component: CopyButtonComponent;
  let fixture: ComponentFixture<CopyButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CopyButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CopyButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
