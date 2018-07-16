import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericFooterComponent } from './generic-footer.component';

describe('GenericFooterComponent', () => {
  let component: GenericFooterComponent;
  let fixture: ComponentFixture<GenericFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenericFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
