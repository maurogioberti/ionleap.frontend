import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BrandResponse } from '../models/responses/brand.response';
import { Objects } from '../core/utils/objects';
import { RestServiceManager } from '../core/services/rest.service.manager';
import { BrandRequest } from '../models/requests/brand.request';

@Injectable({
  providedIn: 'root'
})
export class BrandService extends RestServiceManager<BrandRequest, BrandResponse> {

    constructor(protected http: HttpClient) {
      super(http, "brand");
    }

}