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

  ID: string = '';

  getMovie(movieName: string): Observable<MovieInfo> {
    this.http
      .get<FavouriteMoviesList[]>(`${environment.jsonServerBase}movies`)
      .subscribe((x) => {
        const lastIndex = x.length - 1;
        this.ID = (Number(x[lastIndex].id) + 1).toString();
      });
    return this.http.get<MovieInfo>(
      `${this.apiBaseMovie}?t=${movieName}&apikey=${this.movieApiKey}`
    );
  }

  getCountry(country: string): Observable<CountryInfo[]> {
    return this.http.get<CountryInfo[]>(`${this.apiBaseCountry}${country}`);
  }

  getFavourites(): Observable<FavouriteMoviesList[]> {
    return this.http.get<FavouriteMoviesList[]>(
      `${environment.jsonServerBase}movies`
    );
  }

  saveMovie(object: FavouriteMoviesList) {
    return this.http.post(`${environment.jsonServerBase}movies`, object);
  }

  editMovieComment(id: string, object: FavouriteMoviesList) {
    return this.http.patch(`${environment.jsonServerBase}movies/${id}`, object);
  }

  deleteMovie(id: string) {
    return this.http.delete(`${environment.jsonServerBase}movies/${id}`);
  }
}
