import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url = "./assets/server/data.json";
  constructor(private http: HttpClient) { }

  getProductData(){
    return this.http.get(this.url);
  }
}
