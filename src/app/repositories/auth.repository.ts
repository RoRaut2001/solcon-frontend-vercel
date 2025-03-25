import {Injectable} from '@angular/core';
import {ApiClientService} from '../clients/http-client.service';
import {Observable} from 'rxjs';
import {API_URL} from '../constants/api-urls';

@Injectable({
  providedIn: 'root',
})

/**** Auth Repository to manage Authentication requests ****/
export class AuthRepository{
  constructor(private apiClientService: ApiClientService){ }

  /**** Login Request Manager ****/
  login(credentials:{email: string, password: string}): Observable<any>{
    return this.apiClientService.post(API_URL.AUTH.LOGIN, credentials);
  }
}
