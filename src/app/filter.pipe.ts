import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  // transform(value: any[], term: string): any[] {
  //   if(!value) return [];
  //   if(!term) return value;
  //   return value.filter((x:any) => x.empName.toLowerCase().includes(term.toLowerCase()) )
  // }


  searchText = '';
  transform(items: any, searchText: any, ele: any) {

    if (!items) return [];
    if (!searchText) return items;
    searchText = searchText.toLowerCase();
    ele = ele.toLowerCase();
    switch (ele) {
      case 'id': {
        return items.filter(items => {
          return items.id.toString().includes(searchText);
        })
      }
      case 'title': {
        return items.filter(items => {
          return items.brand.toLowerCase().includes(searchText);
        })
      }

      case 'category': {
        return items.filter(items => {
          return items.category.toLowerCase().includes(searchText);
        })
      }

      case 'mypost': {
        return items.filter(items => {
          return items.user.toString().includes(searchText);
        })
      }
      case 'myfvrt': {
        return items.filter(items => {
          return items.fvrt.toString().includes(searchText);
        })
      }
    }
  }








}


// transform(items: any[], searchText: string): any[] {
//   if(!items) return [];
//   if(!searchText) return items;
// searchText = searchText.toLowerCase();
// return items.filter( it => {
//     return it.toLowerCase().includes(searchText);
//   });
//  }
