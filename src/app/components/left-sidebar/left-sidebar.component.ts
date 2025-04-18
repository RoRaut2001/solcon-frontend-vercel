import {Component, EventEmitter, input, Input, OnInit, output, Output} from '@angular/core';
import {RouterModule, NavigationEnd, Router, RouterLink, RouterLinkActive} from '@angular/router';
import {CommonModule} from '@angular/common';
import {MatIcon} from '@angular/material/icon';
import {FormsModule} from '@angular/forms';
import {CompanyService} from '../../services/company.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-left-sidebar',
  standalone: true,
  templateUrl: './left-sidebar.component.html',
  imports: [
    RouterModule,
    RouterLink,
    RouterLinkActive,
    CommonModule,
    MatIcon,
    FormsModule
  ],
  styleUrls: ['./left-sidebar.component.css']
})


export class LeftSidebarComponent implements OnInit {

  constructor(
    private router: Router,
    private companyService: CompanyService,
    private toastr: ToastrService,
  ) { }


  isLeftSidebarCollapsed = input.required<boolean>();
  changeIsLeftSidebarCollapsed = output<boolean>();


  items = [
    {
      routeLink: 'dashboard/company-list',
      icon: 'list',
      label: 'Company List',
      type: 'dropdown',
      hasArrow: true,
    },
  ];

  companyListOpen = false;
  searchQuery = '';
  selectedCompany: { company_id: string, company_name: string } | null = null;
  isLoading = false;
  companies: { company_id: string; company_name: string }[] = [];



  toggleCompanyList() {
    this.companyListOpen = !this.companyListOpen;
    if (this.companyListOpen) {
      this.router.navigate(['/dashboard/company-list']);
    }
  }


  filteredCompanies() {
    return this.companies.filter(company =>
      company.company_name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  selectCompany(company: { company_id: string; company_name: string }): void {
    this.selectedCompany = company;
    this.companyService.setSelectedCompany(company.company_id, company.company_name);
    console.log('Selected Company:', company);
  }

  trackCompany(index: number, company: { company_id: string; company_name: string }): string {
    return company.company_id;
  }


  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        /**** Close the dropdown if navigating to Dashboard ****/
        if (event.url.includes('/dashboard/home')) {
          this.companyListOpen = false;
        }
      }
    });
    this.getCompanyList();
  }

  getCompanyList(): void {
    this.isLoading = true;
    this.companyService.getCompanyList().subscribe({
      next: (response) => {
        /* Map the response to match the internal company object structure */
        this.companies = response.map((company: any) => ({
          company_id: company.companyId,
          company_name: company.companyName
        }));
      },
      error: (err) => {
        this.toastr.error('Failed to fetch company list.', err.message);
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }


  toggleCollapse(): void {
    this.changeIsLeftSidebarCollapsed.emit(!this.isLeftSidebarCollapsed());
  }

  closeSidenav(): void {
    this.changeIsLeftSidebarCollapsed.emit(true);
  }

  isActive(route: string): boolean {
    return this.router.url.includes(route);
  }

}
