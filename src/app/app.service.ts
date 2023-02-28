import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { forkJoin, from, Observable, of, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  CountryInfo,
  MovieInfo,
  FavouriteMoviesList,
  AllCountries,
  addedMoviesList,
} from './app.model';
import { AddMovie, GetMovie } from './home/add-movie/add-movie.model';
import {
  API_BASE_COUNTRY,
  API_BASE_COUNTRY_ALL,
  API_BASE_MOVIE,
} from './tokens';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  countryUrl: string = '';
  movieApiKey: string = '3126bd16';

  constructor(
    private http: HttpClient,
    @Inject(API_BASE_MOVIE) private apiBaseMovie: string,
    @Inject(API_BASE_COUNTRY) private apiBaseCountry: string,
    @Inject(API_BASE_COUNTRY_ALL) private apiBaseCountryAll: string
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

  getAllCountry(): Observable<AllCountries[]> {
    return this.http.get<any>(`${this.apiBaseCountryAll}`);
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

  saveAddedMovie(object: Partial<GetMovie>) {
    return this.getAddedMovies().pipe(
      switchMap((moviesList) => {
        const id =
          moviesList.length === 0
            ? 1
            : moviesList[moviesList.length - 1].id + 1;
        return this.http.post(`${environment.jsonServerBase}addedMovies`, {
          id: id,
          ...object,
        });
      })
    );
  }

  editAddedMovie(id: string, object: Partial<GetMovie>) {
    return this.http.patch(
      `${environment.jsonServerBase}addedMovies/${id}`,
      object
    );
  }

  deleteAddedMovie(id: string) {
    return this.http.delete(`${environment.jsonServerBase}addedMovies/${id}`);
  }

  getAddedMovies(): Observable<addedMoviesList[]> {
    return this.http.get<addedMoviesList[]>(
      `${environment.jsonServerBase}addedMovies`
    );
  }
}
