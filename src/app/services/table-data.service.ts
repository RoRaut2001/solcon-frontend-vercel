import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface CompanyData {
  companyName: string;
  location: string;
  industry: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private dataSubject = new BehaviorSubject<CompanyData[]>([]); // Holds table data

  // Get the Observable to subscribe to changes
  getData(): Observable<CompanyData[]> {
    return this.dataSubject.asObservable();
  }

  // Set new data (useful for dynamic updates)
  setData(data: CompanyData[]): void {
    this.dataSubject.next(data);
  }
}
