import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseResponse } from '../models/response/base.response';
import { Objects } from '../utils/objects';
import { RestServiceReader } from './rest.service.reader';

export abstract class RestServiceManager<TRequest, TResponse> extends RestServiceReader<TResponse>{
    
    constructor(protected http: HttpClient, serviceUrl : string) {
        super(http, serviceUrl);
    }

    public add(request: TRequest) {
        return this.http.put<BaseResponse<TResponse>>(`${this.serviceUrl}/${Objects.getMethodName()}`, request);
    }

    public modify(request: TRequest) {
        return this.http.patch<BaseResponse<TResponse>>(`${this.serviceUrl}/${Objects.getMethodName()}`, request);
    }

    public remove(id: number) {
        return this.http.delete<BaseResponse<TResponse>>(`${this.serviceUrl}/${Objects.getMethodName()}?id=${id}`);
    }
}