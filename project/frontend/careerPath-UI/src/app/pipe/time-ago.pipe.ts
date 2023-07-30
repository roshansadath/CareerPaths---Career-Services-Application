import { Pipe, PipeTransform } from '@angular/core';
import { differenceInDays } from 'date-fns';

@Pipe({
  name: 'timeAgo'
})
export class TimeAgoPipe implements PipeTransform {

  transform(value: string): string {
    const currentDate = new Date();
    const inputDateTime = new Date(value);
    const daysAgo = differenceInDays(currentDate, inputDateTime);
    return daysAgo === 1 ? '1 day ago' : `${daysAgo} days ago`;
  }

}
