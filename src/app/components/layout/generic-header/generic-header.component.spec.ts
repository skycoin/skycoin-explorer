import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericHeaderComponent } from './generic-header.component';

describe('GenericHeaderComponent', () => {
  let component: GenericHeaderComponent;
  let fixture: ComponentFixture<GenericHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenericHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
