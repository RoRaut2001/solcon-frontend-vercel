import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AuthRepository} from '../repositories/auth.repository';

@Injectable({
  providedIn: 'root',
})

/**** Auth Service to handle authentication business logic ****/
export class AuthService {
  constructor(private authRepository: AuthRepository) { }

  /**** login service ****/
  login(email: string, password: string): Observable<any> {
    return  this.authRepository.login({email, password});
  }

}
