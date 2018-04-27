import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnspentOutputsComponent } from './unspent-outputs.component';

describe('BlockDetailsComponent', () => {
  let component: UnspentOutputsComponent;
  let fixture: ComponentFixture<UnspentOutputsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnspentOutputsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnspentOutputsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
