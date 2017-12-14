import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockChainTableComponent } from './block-chain-table.component';

describe('BlockChainTableComponent', () => {
  let component: BlockChainTableComponent;
  let fixture: ComponentFixture<BlockChainTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockChainTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockChainTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
