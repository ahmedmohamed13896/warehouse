import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.css']
})
export class ProductTableComponent implements OnInit {

  @Input() filteredData: any;
  // pagination
  page:number =1;

  constructor() { }

  ngOnInit(): void {
  }

}
