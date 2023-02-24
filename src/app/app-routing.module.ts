import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddMovieComponent } from './home/add-movie/add-movie.component';
import { DetailsComponent } from './home/favorites/details/details.component';
import { FavoritesComponent } from './home/favorites/favorites.component';
import { HomeComponent } from './home/home.component';
import { SearchMovieComponent } from './home/search-movie/search-movie.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'search',
    component: SearchMovieComponent,
  },
  {
    path: 'favorites',
    component: FavoritesComponent,
  },
  {
    path: 'details/:id',
    component: DetailsComponent,
  },
  {
    path: 'add-movie',
    component: AddMovieComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
