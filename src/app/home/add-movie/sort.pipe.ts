import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort',
})
export class SortPipe implements PipeTransform {
  transform(
    value: any[],
    keya: string,
    keyb: string,
    reverse: boolean = false
  ): any[] {
    if (!value || !keya || !keyb) {
      return value;
    }

    return value.sort((a, b) => {
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
