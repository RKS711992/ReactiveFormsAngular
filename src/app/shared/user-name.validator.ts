import { AbstractControl, ValidatorFn } from "@angular/forms";

// export function forbiddenNameValidator(
//   control: AbstractControl
// ): { [key: string]: any } | null {
//   const forbidden1 = /admin/.test(control.value);
//   const forbidden2 = /superuser/.test(control.value);

//   return forbidden1 || forbidden2
//     ? { forbiddenName: { value: control.value } }
//     : null;
// }

export function forbiddenNameValidator(forbiddenName: RegExp): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const forbidden1 = forbiddenName.test(control.value);
    return forbidden1 ? { forbiddenName: { value: control.value } } : null;
  };
}
