import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { FavouriteMoviesList } from 'src/app/app.model';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  selection: FavouriteMoviesList | undefined;

  constructor(
    private api: AppService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params['id'];
    this.api
      .getFavourites()
      .pipe(switchMap((favorites) => favorites))
      .subscribe((x) => {
        if (x.id === id) {
          this.selection = x;
        }
      });
  }
}
