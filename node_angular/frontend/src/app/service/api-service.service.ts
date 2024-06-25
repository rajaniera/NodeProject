import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ApiServiceService {
  constructor(private http: HttpClient) {}
  apiurl = 'http://localhost:3000/user/';

  getAllData(): Observable<any> {
    return this.http.get(`${this.apiurl}`);
  }

  //create data

  createData(data: any): Observable<any> {
    const url = `${this.apiurl}add`;
    console.log(data, 'createapi');
    return this.http.post<any>(url, data);
  }

  //deletData()

  deletData(id: any): Observable<any> {
    const url = `${this.apiurl}delete/${id}`;

    console.log(id, 'id deleted');
    return this.http.delete<any>(url, id);
  }

  //update data
  updateData(data: any, id: any): Observable<any> {
    let ids = id;
    return this.http.put(`${this.apiurl}${ids}`, data);
  }

  //single

  getSingleData(id: any): Observable<any> {
    const url = `${this.apiurl}${id}`;
    console.log(url);
    return this.http.get(url);
  }
}
