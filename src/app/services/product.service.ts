import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductResponse } from '../models/responses/product.response';
import { Objects } from '../core/utils/objects';
import { RestServiceManager } from '../core/services/rest.service.manager';
import { ProductRequest } from '../models/requests/product.request';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends RestServiceManager<ProductRequest, ProductResponse> {

    constructor(protected http: HttpClient) {
      super(http, "product");
    }

}