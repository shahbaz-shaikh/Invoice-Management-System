import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemDesTestComponent } from './item-des-test.component';

describe('ItemDesTestComponent', () => {
  let component: ItemDesTestComponent;
  let fixture: ComponentFixture<ItemDesTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemDesTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemDesTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
