import { Injectable } from '@angular/core';
import { Product } from './product-detail.model';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProductDetailService {
  formData:Product
  readonly rootURL = 'http://localhost:59165/api';
  list : Product[];

  constructor(private http: HttpClient) { }

  postProductDetail() {
    debugger;
    return this.http.post(this.rootURL + '/Product', this.formData);
  }
  putProductDetail() {
    
    return this.http.put(this.rootURL + '/Product/'+ this.formData.Id, this.formData);
  }
  deleteProductDetail(id) {
    return this.http.delete(this.rootURL + '/Product/'+ id);
  }

  refreshList(){
    debugger;
    this.http.get(this.rootURL + '/Product')
    .toPromise()
    .then(res => this.list = res as Product[]);
  }
}
