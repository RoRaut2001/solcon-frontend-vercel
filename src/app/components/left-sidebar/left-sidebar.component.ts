import {Component, EventEmitter, input, Input, OnInit, output, Output} from '@angular/core';
import {NavigationEnd, Router, RouterLink, RouterLinkActive} from '@angular/router';
import {CommonModule} from '@angular/common';
import {MatIcon} from '@angular/material/icon';
import {FormsModule} from '@angular/forms';
import {CompanyService} from '../../services/company.service';

@Component({
  selector: 'app-left-sidebar',
  standalone: true,
  templateUrl: './left-sidebar.component.html',
  imports: [
    RouterLink,
    RouterLinkActive,
    CommonModule,
    MatIcon,
    FormsModule
  ],
  styleUrls: ['./left-sidebar.component.css']
})
export class LeftSidebarComponent implements OnInit {

  constructor(private router: Router, private companyService: CompanyService) { }


  isLeftSidebarCollapsed = input.required<boolean>();
  changeIsLeftSidebarCollapsed = output<boolean>();

  items = [
    {
      routeLink: 'dashboard/home',  // Ensure it correctly navigates inside the dashboard
      icon: 'dashboard',
      label: 'Dashboard',
      type: 'link',
      hasArrow: true,
    },
    {
      routeLink: 'dashboard/company-list', // Change this to correctly match the child route
      icon: 'list',
      label: 'Company Lists',
      type: 'dropdown',
      hasArrow: true,
    },
  ];

  companyListOpen = false;
  searchQuery = '';
  selectedCompany: { company_id: number, company_name: string } | null = null;

  companies = [
    { "company_id": 1, "company_name": "Solcon Capital" },
    { "company_id": 2, "company_name": "4Di Capital Fund" },
    { "company_id": 3, "company_name": "ESET" },
    { "company_id": 4, "company_name": "CBMS" },
    { "company_id": 5, "company_name": "CIPCIF" },
    { "company_id": 6, "company_name": "Inala Broadcast" },
    { "company_id": 7, "company_name": "InQuba" },
    { "company_id": 8, "company_name": "Seacom" },
    { "company_id": 9, "company_name": "LifeQ" }
  ]


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

  selectCompany(company: { company_id: number; company_name: string }): void {
    this.selectedCompany = company;
    this.companyService.setSelectedCompany(company.company_id, company.company_name);
    console.log('Selected Company:', company);
  }

  trackCompany(index: number, company: { company_id: number; company_name: string }): number {
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
