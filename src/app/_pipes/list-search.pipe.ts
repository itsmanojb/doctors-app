import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'listSearch'
})
export class ListSearchPipe implements PipeTransform {

  transform(items: any[], searchText: string, list: string): any[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }

    searchText = searchText.toLowerCase();
    if (list === 'ehrpatients') {
      // console.log(searchText);
      return items.filter(it => {
        return it.id.toLowerCase().includes(searchText) || it.name.toLowerCase().includes(searchText);
      });
    } else if (list === 'document') {
      return items.filter(it => {
        return it.label.toLowerCase().includes(searchText);
      });
    }

  }

}
