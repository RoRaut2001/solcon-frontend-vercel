import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {API_URL} from '../constants/api-urls';


/**** Decoration for Dependency injection of API Client ****/
@Injectable({
  providedIn: 'root',
})

/**** Class to be exported as Client which will be used to interact with API ****/
export class ApiClientService {
  private  baseurl = API_URL.BASE_URL;
  /**** Constructor for self initializing the class ****/
  constructor(private http: HttpClient) {  }

  /**** Method to add Bearer Token in Header from session ****/
  private getHeaders(): HttpHeaders {
    /****
     step 1: Get Token from session
     step 2: If found set it to header
     step 3: If token is not present do not add to header
     ****/
    const token = localStorage.getItem('token');
    return token ? new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    }) : new HttpHeaders({
      'Content-Type': 'application/json',
    });
  }

  /**** Client method to allow repository to access get routes ****/
  get<T>(url: string): Observable<T> {
    return this.http.get<T>(`${this.baseurl}${url}`, {headers: this.getHeaders()});
  }

  /**** Client method to allow repository to access post routes ****/
  post<T>(url: string, data: any): Observable<T> {
    const headers = this.getHeaders();
    return headers
      ? this.http.post<T>(`${this.baseurl}${url}`, data, { headers })
      : this.http.post<T>(`${this.baseurl}${url}`, data);
  }

  /**** Client method to allow repository to access put routes ****/
  put<T>(url: string, data: any): Observable<T> {
    return this.http.put<T>(`${this.baseurl}${url}`, data, {headers: this.getHeaders()});
  }

  /**** Client method to allow repository to access delete routes ****/
  delete<T>(url: string, data: any): Observable<T> {
    return this.http.post<T>(`${this.baseurl}${url}`, data, {headers: this.getHeaders()});
  }

  /* Method to handle file uploads using multipart form data */
  uploadFile<T>(url: string, file: File, additionalData?: { [key: string]: any }): Observable<T> {
    const formData: FormData = new FormData();
    formData.append('file', file);

    if (additionalData) {
      Object.keys(additionalData).forEach((key) => {
        formData.append(key, additionalData[key]);
      });
    }

    // Retrieve token from localStorage
    const token = localStorage.getItem('token');

    // Set Authorization header if token exists
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    return this.http.post<T>(`${this.baseurl}${url}`, formData, { headers });
  }

}
