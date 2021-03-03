import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CustomerResponse } from '../models/responses/customer.response';
import { Objects } from '../core/utils/objects';
import { RestServiceManager } from '../core/services/rest.service.manager';
import { CustomerRequest } from '../models/requests/customer.request';

@Injectable({
  providedIn: 'root'
})
export class CustomerService extends RestServiceManager<CustomerRequest, CustomerResponse> {

    constructor(protected http: HttpClient) {
      super(http, "customer");
    }

}