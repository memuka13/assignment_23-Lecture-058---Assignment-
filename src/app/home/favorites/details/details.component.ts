import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
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

  @ViewChild('input') input: ElementRef | undefined;

  hidden: boolean = true;

  constructor(
    private api: AppService,
    private activatedRoute: ActivatedRoute
  ) {}

  activateEditArea(text: string) {
    this.hidden = !this.hidden;
  }

  editMovieComment(id: string, object: FavouriteMoviesList) {
    const comment = this.input?.nativeElement.value;
    let obj = { ...object, comment };
    this.hidden = !this.hidden;

    this.selection = obj;

    return this.api.editMovieComment(id, obj).subscribe();
  }

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
