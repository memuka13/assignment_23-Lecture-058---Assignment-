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
  constructor(private api: AppService) {}

  ngOnInit() {
    // this.favorites$ = this.api.getFavourites();
  }
}
