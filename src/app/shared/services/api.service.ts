import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, take, tap, catchError } from 'rxjs';
import { DataState } from '../state/datastate';
import { ToastService } from 'src/app/core/services/toast.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private _httpClient: HttpClient,
    private _toastService: ToastService,
    private _router: Router,
  ) { }
  httpClient = this._httpClient;
  toastServices = this._toastService;
  router = this._router;
  // apiUrl: string = "http://localhost:3000/";
  apiUrl: string = "https://manzer-api-jdavidson974.vercel.app/";
  get<T>(path: string, processModel: DataState<T>, httpParam?: HttpParams): Observable<T> {
    processModel.setIsLoading$(true);
    processModel.setHasError$(false);
    processModel.setValue$(null);
    return this.httpClient.get<T>(this.apiUrl + path, httpParam ? { params: httpParam } : {}).pipe(
      take(1),
      tap(result => {
        processModel.setValue$(result);
        processModel.setIsLoading$(false);
      }),
      catchError(error => {
        processModel.setIsLoading$(false);
        processModel.setHasError$(true);
        throw error
      })
    );
  }
  post<T>(path: string, processModel: DataState<T>, params: any, option?: any): Observable<T> {
    processModel.setIsLoading$(true);
    processModel.setHasError$(false);
    processModel.setValue$(null);
    return this.httpClient.post<T>(this.apiUrl + path, params,).pipe(
      take(1),
      tap(result => {
        processModel.setValue$(result);
        processModel.setIsLoading$(false);
      }),
      catchError(error => {
        processModel.setIsLoading$(false);
        processModel.setHasError$(true);
        throw error
      })
    );
  }
  patch<T>(path: string, processModel: DataState<T>, params: any): Observable<T> {
    processModel.setIsLoading$(true);
    processModel.setHasError$(false);
    processModel.setValue$(null);
    return this.httpClient.patch<T>(this.apiUrl + path, params).pipe(
      tap(result => {
        processModel.setValue$(result);
        processModel.setIsLoading$(false);
      }),
      catchError(error => {
        processModel.setIsLoading$(false);
        processModel.setHasError$(true);
        throw error
      })
    );
  }

  getFile<T>(endPoint: string, processModel: DataState<T>, path?: { path: string }) {
    processModel.setIsLoading$(true);
    processModel.setHasError$(false);
    if (path) {
      return this.httpClient.post(`${this.apiUrl}${endPoint}`, path, { responseType: 'blob' }).pipe(
        tap(
          result => {
            processModel.setIsLoading$(false);
          }
        ),
        catchError(error => {
          throw error
        })
      );
    } else {
      return this.httpClient.get(`${this.apiUrl}${endPoint}`, { responseType: 'blob' }).pipe(
        tap(
          result => {
            processModel.setIsLoading$(false);
          }
        ),
        catchError(error => {
          throw error
        })
      );
    }
  }
  delete<T>(path: string, processModel: DataState<T>, params?: string[]): Observable<T> {
    processModel.setIsLoading$(true);
    processModel.setHasError$(false);
    processModel.setValue$(null);
    return this.httpClient.delete<T>(this.apiUrl + path).pipe(
      take(1),
      tap(result => {
        processModel.setValue$(result);
        processModel.setIsLoading$(false);
      }),
      catchError(error => {
        processModel.setIsLoading$(false);
        processModel.setHasError$(true);
        throw error
      })
    );
  }
}
