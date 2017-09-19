import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value.sort((a, b) => {
      if (a[args.property] < b[args.property]) {
        return -1;
      } else if (a[args.property] > b[args.property]) {
        return 1;
      } else {
        return 0;
      }
    });
  }

}
