import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AppServiceService {
  baseUrl = 'http://localhost/api';
  constructor(private http: HttpClient) { }
  getAll(): Observable<JSON[]> {
    return this.http.get(`${this.baseUrl}/backend.php`).pipe(
      map((res) => {
        return res['msg'];
    }));
  }
}
