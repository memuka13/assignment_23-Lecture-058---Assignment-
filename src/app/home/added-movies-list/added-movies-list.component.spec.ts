import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddedMoviesListComponent } from './added-movies-list.component';

describe('AddedMoviesListComponent', () => {
  let component: AddedMoviesListComponent;
  let fixture: ComponentFixture<AddedMoviesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddedMoviesListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddedMoviesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
