import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { FavouriteMoviesList } from 'src/app/app.model';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent {
  favorites$ = this.api.getFavourites();
  http: any;
  constructor(private api: AppService) {}

  deleteMovie(id: string) {
    return this.api
      .deleteMovie(id)
      .subscribe(() => (this.favorites$ = this.api.getFavourites()));
  }

  ngOnInit() {
    // this.favorites$ = this.api.getFavourites();
  }
}
