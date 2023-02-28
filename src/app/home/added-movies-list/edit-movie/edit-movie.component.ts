import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, switchMap, tap } from 'rxjs';
import { addedMoviesList } from 'src/app/app.model';
import { AppService } from 'src/app/app.service';
import { dateGreaterThanOrEqualToCurrent } from '../../add-movie/add-movie.functions';
import {
  AddMovie,
  AllCountries,
  MovieOrTvShow,
} from '../../add-movie/add-movie.model';

@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.scss'],
})
export class EditMovieComponent implements OnInit {
  isSubmitted = false;
  movieOrTvShow = MovieOrTvShow;
  allCountries$: Observable<AllCountries[]> = this.api.getAllCountry();
  form: FormGroup<AddMovie> | undefined;
  isGreterThan50Million: boolean = false;
  selection: addedMoviesList | undefined;

  constructor(
    private api: AppService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private _router: Router
  ) {}

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params['id'];
    this.api
      .getAddedMovies()
      .pipe(
        tap((list) => {
          this.selection = list.find((x) => x.id.toString() === id);
          console.log(this.selection);

          this.form = this.buildForm();
        })
      )
      .subscribe();
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
      return this.api
        .editAddedMovie(
          this.activatedRoute.snapshot.params['id'],
          this.form.value
        )
        .subscribe(() => this._router.navigate(['added-movie-list']));
    }
    return;
  }

  private buildForm() {
    return this.fb.group<AddMovie>({
      name: this.fb.control(this.selection?.name, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
      country: this.fb.control(this.selection?.country, [Validators.required]),
      premierEventPlace: this.fb.control(this.selection?.premierEventPlace),
      releaseDate: this.fb.control(this.selection?.releaseDate, [
        Validators.required,
        dateGreaterThanOrEqualToCurrent,
      ]),
      genre: this.fb.group({
        action: this.fb.control(this.selection?.genre?.action!),
        comedy: this.fb.control(this.selection?.genre?.comedy!),
        drama: this.fb.control(this.selection?.genre?.drama!),
        fantasy: this.fb.control(this.selection?.genre?.fantasy!),
        horror: this.fb.control(this.selection?.genre?.horror!),
        mystery: this.fb.control(this.selection?.genre?.mystery!),
        romance: this.fb.control(this.selection?.genre?.romance!),
        thriller: this.fb.control(this.selection?.genre?.thriller!),
      }),
      movieOrTvShow: this.fb.control(this.selection?.movieOrTvShow, [
        Validators.required,
      ]),
      minutes: this.fb.control(this.selection?.minutes!, [
        Validators.min(60),
        Validators.max(190),
      ]),
      series: this.fb.control(this.selection?.series!),
      rating: this.fb.control(this.selection?.rating, [Validators.min(1)]),
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
