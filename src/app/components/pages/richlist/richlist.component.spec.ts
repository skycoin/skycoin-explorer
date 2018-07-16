import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RichlistComponent } from './richlist.component';

describe('BlockChainTableComponent', () => {
  let component: RichlistComponent;
  let fixture: ComponentFixture<RichlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RichlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RichlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
