import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

export abstract class RestServiceGeneric {

    public serviceUrl: string = `${environment.serverAddress}:${environment.serverPort}`;
    
    constructor(protected http: HttpClient, serviceUrl : string) {
        this.serviceUrl += `/${serviceUrl}`;
    }

    public get<T>(prefix: string) : Observable<T> {
        return this.http.get<T>(`${this.serviceUrl}/${prefix}`);
    }

    public post<T>(prefix: string, object : any) : Observable<T> {
        return this.http.post<T>(`${this.serviceUrl}/${prefix}`, object);
    }

    public put<T>(prefix: string, object : any) : Observable<T> {
        return this.http.put<T>(`${this.serviceUrl}/${prefix}`, object);
    }

    public patch<T>(prefix: string, object : any) : Observable<T> {
        return this.http.patch<T>(`${this.serviceUrl}/${prefix}`, object);
    }

    public delete<T>(prefix: string) : Observable<T> {
        return this.http.delete<T>(`${this.serviceUrl}/${prefix}`);
    }
}