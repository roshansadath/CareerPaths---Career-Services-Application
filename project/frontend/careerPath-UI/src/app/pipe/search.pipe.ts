import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  transform(items: any[], searchTerm: string): any[] {
    if (!items || !searchTerm) {
      return items;
    }

    searchTerm = searchTerm.toLowerCase();

    return items.filter(item => {
      // console.log(item);
      // Adjust the property based on your data structure
      const itemValue = item.title.toLowerCase();
      return itemValue.includes(searchTerm);
    });
  }
}
