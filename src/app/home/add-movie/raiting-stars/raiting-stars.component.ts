import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-raiting-stars',
  templateUrl: './raiting-stars.component.html',
  styleUrls: ['./raiting-stars.component.scss'],
})
export class RaitingStarsComponent {
  @Input() maxRating = 10;
  @Input() currentRating = 0;
  @Output() ratingUpdated = new EventEmitter<number>();

  stars: number[] = [];

  ngOnInit() {
    this.stars = Array(this.maxRating)
      .fill(0)
      .map((_, i) => i + 1);
  }

  rate(rating: number) {
    this.currentRating = rating;
    this.ratingUpdated.emit(rating);
  }
}
