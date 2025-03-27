import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  selectedCompany = signal<{ companyId: number; companyName: string }>({
    companyId: 1, // Default company ID
    companyName: 'Solcon Capital', // Default company name
  });

  setSelectedCompany(companyId: number, companyName: string) {
    this.selectedCompany.set({ companyId, companyName });
  }
}
