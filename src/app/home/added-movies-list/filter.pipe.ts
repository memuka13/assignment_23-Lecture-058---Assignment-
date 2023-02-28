import { Pipe, PipeTransform } from '@angular/core';
import { Genre, GetGenre, GetMovie } from '../add-movie/add-movie.model';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(value: Genre, ...args: unknown[]): unknown {
    return Object.keys(value).filter((key: string) => {
      if (value !== null) {
        const genreKey = key as keyof Genre;
        return value[genreKey];
      }
      return;
    });
  }
}
