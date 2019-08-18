import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'urlify'
})
export class UrlifyPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!value) return null;
    const text = value;
    const exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    const text1 = text.replace(exp, "<a target='_blank' href='$1'>$1</a>");
    const exp2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
    return text1.replace(exp2, '$1<a target="_blank" href="http://$2">$2</a>');
  }

}
