import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CoinsFormatterComponent } from 'app/components/layout/coins-formatter/coins-formatter.component';

describe('GenericHeaderComponent', () => {
  let component: CoinsFormatterComponent;
  let fixture: ComponentFixture<CoinsFormatterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoinsFormatterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoinsFormatterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
