import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
})
export class TruncatePipe implements PipeTransform {

  transform(value: string, limit = 25, completeWords = false, ellipsis = '...') {
    if (value.length < limit) {
      return value;
    }
    let l = limit;
    if (completeWords) {
      l = value.substr(0, 13).lastIndexOf(' ');
    }
    return `${value.substr(0, l)}${ellipsis}`;
  }

}
