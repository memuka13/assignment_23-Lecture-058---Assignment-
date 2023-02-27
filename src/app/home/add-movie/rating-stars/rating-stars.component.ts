import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-rating-stars',
  templateUrl: './rating-stars.component.html',
  styleUrls: ['./rating-stars.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RatingStarsComponent),
      multi: true,
    },
  ],
})
export class RatingStarsComponent implements OnInit, ControlValueAccessor {
  hoveredStars: number = 0;
  rating: number = 0;

  private _stars: unknown[] = Array(0);
  get stars() {
    return this._stars;
  }

  @Input() set maxRating(value: number) {
    this._stars = Array(value);
  }

  onChange: (rating: number) => void = () => {};
  onTouched: () => void = () => {};

  constructor() {}

  writeValue(rating: number) {
    this.rating = rating;
    this.onChange(rating);
  }
  registerOnChange(fn: (rating: number) => void) {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void) {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {}

  enter(index: number) {
    return (this.hoveredStars = index + 1);
  }
  leave() {
    return (this.hoveredStars = 0);
  }
  rate(index: number) {
    this.leave();
    this.onChange(index + 1);

    return (this.rating = index + 1);
  }

  ngOnInit(): void {}
}
