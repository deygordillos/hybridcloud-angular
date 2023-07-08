import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from '../api/customer';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class CustomerService {

  constructor(private http: HttpClient) { }

  getCustomersSmall() {
    const request = this.http.get<any>('assets/demo/data/customers-small.json');
    const response = lastValueFrom(request);

    return response.then(res => res.data as Customer[])
      .then(data => data);
  }

  getCustomersMedium() {
    const request = this.http.get<any>('assets/demo/data/customers-medium.json');
    const response = lastValueFrom(request);

    return response.then(res => res.data as Customer[])
      .then(data => data);
  }

  getCustomersLarge() {
    const request = this.http.get<any>('assets/demo/data/customers-large.json');
    const response = lastValueFrom(request);

    return response.then(res => res.data as Customer[])
      .then(data => data);
  }
}
