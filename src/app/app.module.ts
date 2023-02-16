import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SearchMovieComponent } from './home/search-movie/search-movie.component';
import { ReactiveFormsModule } from '@angular/forms';
import { API_BASE_COUNTRY, API_BASE_MOVIE } from './tokens';
import { environment } from 'src/environments/environment';
import { CommonModule } from '@angular/common';
import { FavoritesComponent } from './home/favorites/favorites.component';
import { DetailsComponent } from './home/favorites/details/details.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, SearchMovieComponent, FavoritesComponent, DetailsComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule,
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
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
