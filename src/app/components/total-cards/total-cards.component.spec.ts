import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalCardsComponent } from './total-cards.component';

describe('TotalCardsComponent', () => {
  let component: TotalCardsComponent;
  let fixture: ComponentFixture<TotalCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TotalCardsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
