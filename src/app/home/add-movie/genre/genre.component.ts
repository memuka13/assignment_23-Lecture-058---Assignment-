import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AppService } from 'src/app/app.service';
import { Genre } from '../add-movie.model';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.scss'],
})
export class GenreComponent {
  // genre: FormGroup<Genre> = this.buildForm();
  @Input() genreFormGroup: FormGroup = this.buildForm();

  constructor(private fb: FormBuilder, private api: AppService) {}

  private buildForm() {
    return this.fb.group<Genre>({
      action: this.fb.control(false),
      comedy: this.fb.control(false),
      drama: this.fb.control(false),
      fantasy: this.fb.control(false),
      horror: this.fb.control(false),
      mystery: this.fb.control(false),
      romance: this.fb.control(false),
      thriller: this.fb.control(false),
    });
  }
}
