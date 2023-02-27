import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SearchMovieComponent } from './home/search-movie/search-movie.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  API_BASE_COUNTRY,
  API_BASE_COUNTRY_ALL,
  API_BASE_MOVIE,
} from './tokens';
import { environment } from 'src/environments/environment';
import { CommonModule } from '@angular/common';
import { FavoritesComponent } from './home/favorites/favorites.component';
import { DetailsComponent } from './home/favorites/details/details.component';
import { AddMovieComponent } from './home/add-movie/add-movie.component';
import { SortPipe } from './home/add-movie/sort.pipe';
import { RatingStarsComponent } from './home/add-movie/rating-stars/rating-stars.component';
import { GenreComponent } from './home/add-movie/genre/genre.component';
import { AddedMoviesListComponent } from './home/added-movies-list/added-movies-list.component';
import { FilterPipe } from './home/added-movies-list/filter.pipe';
import { EditMovieComponent } from './home/added-movies-list/edit-movie/edit-movie.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchMovieComponent,
    FavoritesComponent,
    DetailsComponent,
    AddMovieComponent,
    SortPipe,
    RatingStarsComponent,
    GenreComponent,
    AddedMoviesListComponent,
    FilterPipe,
    EditMovieComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
  ],
  providers: [
    {
      provide: API_BASE_MOVIE,
      useValue: environment.apiBaseMovie,
    },
    {
      provide: API_BASE_COUNTRY,
      useValue: environment.apiBaseCountries,
    },
    {
      provide: API_BASE_COUNTRY_ALL,
      useValue: environment.apiBaseCountriesAll,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
