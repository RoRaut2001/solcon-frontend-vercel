import { Injectable, signal } from '@angular/core';
import {ApiClientService} from '../clients/http-client.service';
import {Observable} from 'rxjs';
import {API_URL} from '../constants/api-urls';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  constructor(private apiClient: ApiClientService){}
  selectedCompany = signal<{ companyId: string; companyName: string }>({
    companyId: '8c1c5266-6926-4296-8c4a-5ba22828491e', // Default company ID
    companyName: 'Solcon Capital', // Default company name
  });

  setSelectedCompany(companyId: string, companyName: string) {
    this.selectedCompany.set({ companyId, companyName });
  }

  getCompanyList():Observable<any>{
    return this.apiClient.get(API_URL.COMPANY.GET_COMPANIES);
  }
}
