import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, switchMap, from, of, forkJoin, map, tap } from 'rxjs';
import { CountryInfo, MovieInfo } from 'src/app/app.model';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-search-movie',
  templateUrl: './search-movie.component.html',
  styleUrls: ['./search-movie.component.scss'],
})
export class SearchMovieComponent {
  input: FormControl<string> = new FormControl();
  result$: Observable<MovieInfo> | undefined;
  countryResult$: Observable<CountryInfo[]>[] | undefined;
  raiting: number = 0;
  comment: string = '';

  increaseRaiting() {
    if (this.raiting < 10) {
      this.raiting++;
    }
  }

  decreaseRaiting() {
    if (this.raiting > 0) {
      this.raiting--;
    }
  }

  returnKeys(object: string) {
    return Object.keys(object);
  }

  constructor(private api: AppService) {}

  search() {
    this.result$ = this.api.getMovie(this.input.value).pipe(
      tap((movie) => {
        const countries = movie.Country.split(', ').map((country) =>
          this.fetchFlagsAndCurrencies(country)
        );
        this.countryResult$ = [...countries];
      })
    );

    this.input.setValue('');
  }
  private fetchFlagsAndCurrencies(country: string) {
    return this.api.getCountry(country).pipe(
      map((x: CountryInfo[]) =>
        x.map((country: CountryInfo) => ({
          flags: country.flags,
          currencies: country.currencies,
        }))
      )
    );
  }

  addToFavorites(result: MovieInfo, country: CountryInfo[]) {
    const obj = {
      id: this.api.ID,
      Title: result.Title,
      Year: result.Year,
      Actors: result.Actors,
      currencies: Object.keys(country[0].currencies)[0],
      flags: {
        png: country[0].flags.png,
      },
      comment: this.comment,
      raiting: this.raiting,
    };
    this.result$ = undefined;
    this.raiting = 0;
    this.comment = '';
    return this.api.saveMovie(obj).subscribe();
  }
}
