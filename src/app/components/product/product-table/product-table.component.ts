import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, of } from "rxjs";

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.css']
})
export class ProductTableComponent implements OnInit {

  @Input() filteredData: any;
  productName ='';
  quantity ='';
  type ='';


  // pagination
  page:number =1;

  constructor() {
  }

  ngOnInit(): void {
    this.filteredData.showZeroBalance =true
  }

}
