import { Pipe, PipeTransform } from '@angular/core';
import { AllCountries, GetGenre } from './add-movie.model';

@Pipe({
  name: 'sort',
})
export class SortPipe implements PipeTransform {
  transform(
    value: AllCountries[],
    keya: string,
    keyb: string,
    reverse: boolean = false
  ): AllCountries[] {
    if (!value || !keya || !keyb) {
      return value;
    }

    return value.sort((a: AllCountries, b: AllCountries) => {
      if (a[keya][keyb] < b[keya][keyb]) {
        return reverse ? -1 : 1;
      } else if (a[keya][keyb] > b[keya][keyb]) {
        return reverse ? 1 : -1;
      } else {
        return 0;
      }
    });
  }
}
