import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  form: FormGroup<AddMovie> = this.buildForm();
  isGreterThan50Million: boolean = false;

  constructor(private fb: FormBuilder, private api: AppService) {}

  ngOnInit() {
    this.form.removeControl('series');
    this.form.removeControl('minutes');
  }

  ngAfterViewInit() {
    this.form.controls.movieOrTvShow?.valueChanges.subscribe((type) =>
      this.handleMinutesOrSeries(type)
    );
    this.form.controls.country?.valueChanges.subscribe((country) =>
      this.handlePremier(country)
    );
  }

  handleSubmission() {
    this.isSubmitted = true;
    console.log(this.form);
  }

  private buildForm() {
    return this.fb.group<AddMovie>({
      name: this.fb.control('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
      country: this.fb.control(''),
      premierEventPlace: this.fb.control(''),
      releseDate: this.fb.control(null, [
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
      minutes: this.fb.control(''),
      series: this.fb.control(''),
      raiting: this.fb.control(0),
    });
  }

  private handleMinutesOrSeries(type: MovieOrTvShow | null) {
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

  private handlePremier(country: string | null) {
    if (country !== null) {
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
