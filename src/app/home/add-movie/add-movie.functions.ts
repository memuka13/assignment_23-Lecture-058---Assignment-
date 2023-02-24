import { AbstractControl } from '@angular/forms';

export function dateGreaterThanOrEqualToCurrent(
  control: AbstractControl
): { [key: string]: boolean } | null {
  const inputDate = new Date(control.value);
  const currentDate = new Date();
  return inputDate >= currentDate ? null : { dateInvalid: true };
}
