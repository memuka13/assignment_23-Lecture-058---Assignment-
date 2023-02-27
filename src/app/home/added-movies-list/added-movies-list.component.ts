import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-added-movies-list',
  templateUrl: './added-movies-list.component.html',
  styleUrls: ['./added-movies-list.component.scss'],
})
export class AddedMoviesListComponent {
  addedMovies$ = this.api.getAddedMovies();

  constructor(
    private api: AppService,
    private activatedRoute: ActivatedRoute
  ) {}

  edit(id: string) {
    console.log(this.activatedRoute.snapshot);
  }

  deleteAddedMovie(id: string) {
    return this.api
      .deleteAddedMovie(id)
      .subscribe(() => (this.addedMovies$ = this.api.getAddedMovies()));
  }
}
