import {Injectable} from '@angular/core';
import {ApiClientService} from '../clients/http-client.service';
import {Observable} from 'rxjs';
import {API_URL} from '../constants/api-urls';

@Injectable({
  providedIn: 'root',
})

/**** Auth Repository to manage Authentication requests ****/
export class ReportRepository{
  constructor(private apiClient: ApiClientService){}
  uploadReport(file: File, company_id: string, year: string, quarter: string, month: string): Observable<any>{
    return this.apiClient.uploadFile(API_URL.REPORT.SEND_REPORT, file, {company_id: company_id, year: year, quarter: quarter, month: month});
  }
}
