import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'humanDate',
})
export class HumanDatePipe implements PipeTransform {

  private monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ];

  transform(value: any, args?: any): any {

    const intialDate = new Date(value);
    let output = '';
    const from = + intialDate;
    const to = + new Date();
    const diff = to - from;
    const secDiff = Math.floor(diff / 1000); // seconds
    const minDiff = Math.floor(secDiff / 60); // minutes
    const hourDiff = Math.floor(minDiff / 60); // hours
    const dayDiff = Math.floor(hourDiff / 24); // days
    const monthDiff = Math.floor(dayDiff / 30); // months

    const datevalues = [
      intialDate.getFullYear(),
      intialDate.getMonth() + 1,
      intialDate.getDate(),
      intialDate.getHours(),
      intialDate.getMinutes(),
      intialDate.getSeconds(),
    ];

    if (secDiff < 59) {
      output = 'Just now';
    } else if (secDiff > 59 && minDiff < 60) {
      output = `${minDiff} min ago`;
    } else if (minDiff >= 60 && hourDiff < 24) {
      output = `${hourDiff} hr ago`;
    } else if (hourDiff >= 24 && dayDiff === 1) {
      output = 'Yesterday';
    } else if (dayDiff > 1 && dayDiff <= 31) {
      output = `${dayDiff} days ago`;
    } else if (monthDiff >= 1 && monthDiff <= 6) {
      output = `${this.monthNames[datevalues[1] - 1]} ${datevalues[2]}`;
    } else if (monthDiff > 6) {
      output = `${datevalues[2]}/${datevalues[1]}/${datevalues[0]}`;
    }

    return output;
  }

}
