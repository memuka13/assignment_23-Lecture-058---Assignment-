import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, switchMap, from, of, forkJoin, map, tap } from 'rxjs';
import { CountryInfo, CountryResult, MovieInfo } from 'src/app/app.model';
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
    console.log(result);
    console.log(country);
    const obj = {
      Title: result.Title,
      Year: result.Year,
      Actors: result.Actors,
      currencies: Object.keys(country[0].currencies),
      flags: {
        png: country[0].flags.png,
      },
    };
    console.log(obj);
  }
}
