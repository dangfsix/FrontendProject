import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../app.interfaces';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: Product[], searchText: string): Product[] {
    if (!items || !searchText) {
      return [];
    }
    searchText = searchText.toLocaleLowerCase();

    return items.filter(item => item.name.toLocaleLowerCase().includes(searchText));
  }

}
