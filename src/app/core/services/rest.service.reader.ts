import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BaseResponse } from '../models/response/base.response';
import { Objects } from '../utils/objects';

export abstract class RestServiceReader<TResponse> {

    public serviceUrl: string = `${environment.serverAddress}:${environment.serverPort}`;
    
    constructor(protected http: HttpClient, serviceUrl : string) {
        this.serviceUrl += `/${serviceUrl}`;
    }

    public getall() {
        return this.http.get<BaseResponse<TResponse>>(`${this.serviceUrl}/${Objects.getMethodName()}`);
    }

    public get(id: number) {
        return this.http.get<BaseResponse<TResponse>>(`${this.serviceUrl}/${Objects.getMethodName()}?id=${id}`);
    }
    
    public getbydescription(description: string) {
        return this.http.get<BaseResponse<TResponse>>(`${this.serviceUrl}/${Objects.getMethodName()}?description=${description}`);
    }

    public getlike(like: string) {
        return this.http.get<BaseResponse<TResponse>>(`${this.serviceUrl}/${Objects.getMethodName()}?like=${like}`);
    }

    // private handleError(error: HttpErrorResponse) {
    //     //return this.restHandlerService.handleError(error);
    // }
}