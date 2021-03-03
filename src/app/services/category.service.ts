import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CategoryResponse } from '../models/responses/category.response';
import { Objects } from '../core/utils/objects';
import { RestServiceManager } from '../core/services/rest.service.manager';
import { CategoryRequest } from '../models/requests/category.request';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends RestServiceManager<CategoryRequest, CategoryResponse> {

    constructor(protected http: HttpClient) {
      super(http, "category");
    }

}