import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { isBefore } from 'date-fns';

export function minDateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return { minDate: { value: control.value, message: 'A data é obrigatória.' } };
    }

    const inputDate = new Date(control.value);
    const isBeforeToday = isBefore(inputDate, new Date());
    if (isBeforeToday) {
      return { minDate: { value: control.value, message: 'A data não pode ser no passado.' } };
    }

    return null;
  };
}
