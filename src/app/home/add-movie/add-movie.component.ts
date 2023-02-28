import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map, Observable, switchMap } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { dateGreaterThanOrEqualToCurrent } from './add-movie.functions';
import {
  AddMovie,
  AllCountries,
  Genre,
  MovieOrTvShow,
} from './add-movie.model';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.scss'],
})
export class AddMovieComponent {
  isSubmitted = false;
  movieOrTvShow = MovieOrTvShow;
  allCountries$: Observable<AllCountries[]> = this.api.getAllCountry();
  form: FormGroup<AddMovie> | undefined = this.buildForm();
  isGreterThan50Million: boolean = false;

  constructor(
    private fb: FormBuilder,
    private api: AppService,
    private _router: Router
  ) {}

  ngOnInit() {
    if (this.form) {
      this.form.removeControl('series');
      this.form.removeControl('minutes');
    }
    // this.form = this.buildForm();
  }

  ngAfterViewInit() {
    if (this.form) {
      this.form.controls.movieOrTvShow?.valueChanges.subscribe((type) =>
        this.handleMinutesOrSeries(type)
      );
      this.form.controls.country?.valueChanges.subscribe((country) =>
        this.handlePremier(country)
      );
    }
  }

  handleSubmission() {
    this.isSubmitted = true;
    if (this.form && this.form.valid) {
      return this.api.saveAddedMovie(this.form.value).subscribe(() => {
        this._router.navigate(['added-movie-list']);
      });
    }
    return;
  }

  private buildForm() {
    return this.fb.group<AddMovie>({
      name: this.fb.control(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
      country: this.fb.control(null, [Validators.required]),
      premierEventPlace: this.fb.control(null),
      releaseDate: this.fb.control(null, [
        Validators.required,
        dateGreaterThanOrEqualToCurrent,
      ]),
      genre: this.fb.group({
        action: this.fb.control(false),
        comedy: this.fb.control(false),
        drama: this.fb.control(false),
        fantasy: this.fb.control(false),
        horror: this.fb.control(false),
        mystery: this.fb.control(false),
        romance: this.fb.control(false),
        thriller: this.fb.control(false),
      }),
      movieOrTvShow: this.fb.control(null, [Validators.required]),
      minutes: this.fb.control(null, [Validators.min(60), Validators.max(190)]),
      series: this.fb.control(null),
      rating: this.fb.control(0, [Validators.min(1)]),
    });
  }

  private handleMinutesOrSeries(type: MovieOrTvShow | null | undefined) {
    if (this.form) {
      switch (type) {
        case MovieOrTvShow.Movie: {
          this.form.addControl('minutes', this.fb.control(''));
          this.form.removeControl('series');
          break;
        }
        case MovieOrTvShow.TvShow: {
          this.form.addControl('series', this.fb.control(''));
          this.form.removeControl('minutes');
          break;
        }
      }
    }
  }

  private handlePremier(country: string | null | undefined) {
    if (country !== null && country !== undefined) {
      this.api.getCountry(country).subscribe((x) => {
        if (x[0].population) {
          if (x[0].population > 50000) {
            return (this.isGreterThan50Million = true);
          }
          return (this.isGreterThan50Million = false);
        }
        return;
      });
    }
  }
}
