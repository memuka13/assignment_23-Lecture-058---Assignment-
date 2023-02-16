import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CountryInfo, MovieInfo, FavouriteMoviesList } from './app.model';
import { API_BASE_COUNTRY, API_BASE_MOVIE } from './tokens';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  countryUrl: string = '';
  movieApiKey: string = '3126bd16';

  constructor(
    private http: HttpClient,
    @Inject(API_BASE_MOVIE) private apiBaseMovie: string,
    @Inject(API_BASE_COUNTRY) private apiBaseCountry: string
  ) {}

  getMovie(movieName: string): Observable<MovieInfo> {
    return this.http.get<MovieInfo>(
      `${this.apiBaseMovie}?t=${movieName}&apikey=${this.movieApiKey}`
    );
  }

  getCountry(country: string): Observable<CountryInfo[]> {
    this.http
      .get<CountryInfo[]>(`${this.apiBaseCountry}${country}`)
      .subscribe(console.log);
    return this.http.get<CountryInfo[]>(`${this.apiBaseCountry}${country}`);
  }

  getFavourites(): Observable<FavouriteMoviesList[]> {
    return this.http.get<FavouriteMoviesList[]>(
      `${environment.jsonServerBase}movies`
    );
  }
}
