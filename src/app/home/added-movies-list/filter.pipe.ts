import { Pipe, PipeTransform } from '@angular/core';
import { Genre } from '../add-movie/add-movie.model';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(value: any, ...args: unknown[]): unknown {
    return Object.keys(value).filter((key: string) => {
      if (value !== null) {
        return value[key];
      }
    });
  }
}
