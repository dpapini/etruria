import { Injectable } from '@angular/core';
import { NgbDateAdapter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class CustomDataAdapter implements NgbDateAdapter<Date>{
   fromModel(value: Date | null): NgbDateStruct | null {
      if (value) {
         value = new Date(value);
         return {
            day: value.getDate(),
            month: value.getMonth() + 1,
            year: value.getFullYear(),
         };
      }
      return null;
   }

   toModel(date: NgbDateStruct): Date {
      return date ? new Date(Date.UTC(date.year, date.month - 1, date.day)) : null;
   }
}
