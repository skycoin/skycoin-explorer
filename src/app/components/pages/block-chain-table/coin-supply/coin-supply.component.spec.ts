import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoinSupplyComponent } from './coin-supply.component';

describe('CoinSupplyComponent', () => {
  let component: CoinSupplyComponent;
  let fixture: ComponentFixture<CoinSupplyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoinSupplyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoinSupplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
