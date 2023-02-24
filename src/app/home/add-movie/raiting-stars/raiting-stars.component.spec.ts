import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaitingStarsComponent } from './raiting-stars.component';

describe('RaitingStarsComponent', () => {
  let component: RaitingStarsComponent;
  let fixture: ComponentFixture<RaitingStarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RaitingStarsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RaitingStarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
