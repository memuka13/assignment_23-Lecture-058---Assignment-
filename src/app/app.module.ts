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
import { RaitingStarsComponent } from './home/add-movie/raiting-stars/raiting-stars.component';
import { GenreComponent } from './home/add-movie/genre/genre.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchMovieComponent,
    FavoritesComponent,
    DetailsComponent,
    AddMovieComponent,
    SortPipe,
    RaitingStarsComponent,
    GenreComponent,
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
