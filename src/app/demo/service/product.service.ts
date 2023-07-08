import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../api/product';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ProductService {

  constructor(private http: HttpClient) { }

  getProductsSmall() {
    const request =  this.http.get<any>('assets/demo/data/products-small.json');
    const response = lastValueFrom(request);

    return response
      .then(res => res.data as Product[])
      .then(data => data);
  }

  getProducts() {
    const request =  this.http.get<any>('assets/demo/data/products.json');
    const response = lastValueFrom(request);

    return response
      .then(res => res.data as Product[])
      .then(data => data);
  }

  getProductsMixed() {
    const request =  this.http.get<any>('assets/demo/data/products-mixed.json');
    const response = lastValueFrom(request);

    return response
      .then(res => res.data as Product[])
      .then(data => data);
  }

  getProductsWithOrdersSmall() {
    const request =  this.http.get<any>('assets/demo/data/products-orders-small.json');
    const response = lastValueFrom(request);

    return response
      .then(res => res.data as Product[])
      .then(data => data);
  }
}
