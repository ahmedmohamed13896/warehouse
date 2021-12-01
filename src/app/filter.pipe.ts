import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(fliteredData: any , inputs:any): any[] {
    return fliteredData.products.filter((warehouse:any)=>{
      if(
        warehouse.quantity.toString().includes(inputs.quantity) &&
        warehouse.name.toLowerCase().includes(inputs.productName.trim().toLowerCase()) &&
        fliteredData.type.toLowerCase().includes(inputs.type.trim().toLowerCase())
        ){
        return true;
      }
      return  false;
    });
  }

}
