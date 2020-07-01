import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BrandsServiceService {
  constructor(private http: HttpClient) { }

  loadManufacturers(): Observable<any> {
    return this.http.get('/api/manufacturers');
  }
}
