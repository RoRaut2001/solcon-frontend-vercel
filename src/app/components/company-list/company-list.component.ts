import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyService } from '../../services/company.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { NgFor, NgIf} from '@angular/common';
import {ReportRepository} from '../../repositories/report.repository';
import { NgxSpinnerService } from "ngx-spinner";
import {DataTableComponent} from '../data-table/data-table.component';
import {ReportParserService} from '../../services/report-parser.service';

@Component({
  selector: 'app-company-list',
  standalone: true,
  templateUrl: './company-list.component.html',
  imports: [
    NgFor, NgIf, FormsModule, MatIconModule, ReactiveFormsModule, DataTableComponent
  ],
  styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent implements OnInit {
  isUploading = false;
  reportRepository: ReportRepository;
  selectedCompany = signal<{ companyId: number; companyName: string }>({ companyId: 1, companyName: '' });
  companyForm: FormGroup;
  selectedFileName: string | null = null;
  selectedFile: File | null = null;

  months: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  years: number[] = [2023, 2022, 2021, 2020, 2019];
  quarters: string[] = ['Q1', 'Q2', 'Q3', 'Q4'];

  constructor(
    private router: Router,
    private companyService: CompanyService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private reportService: ReportRepository,
    private spinner: NgxSpinnerService,
    private reportParserService: ReportParserService
  ) {
    this.reportRepository = reportService;
    this.companyForm = this.fb.group({
      month: ['', Validators.required],
      year: ['', Validators.required],
      quarter: ['', Validators.required],
      file: [null, Validators.required]
    });
  }

  // New properties for table data
  tableData: any[] = [];
  finance: any[] = [];
  commBusiness: any[] = [];
  showTable = false;
  financeBalanceSheet: any[] = [];
  technology: any[] = [];


  handleDataChange(updatedData: any[]): void {
    this.tableData = updatedData;
    this.toastr.success('Data updated successfully.', 'Success!', {
      timeOut: 2000,
      closeButton: true,
      positionClass: 'toast-top-right',
      progressBar: true,
    });
  }

  saveTableData(): void {
    const company_id = this.selectedCompany().companyId.toString();
    const month = this.companyForm.get('month')?.value;
    const year = this.companyForm.get('year')?.value.toString();
    const quarter = this.companyForm.get('quarter')?.value;

    // Convert array to object (assuming only 1 item)
    const finance = this.finance.length ? this.finance[0] : {};
    const financeBalanceSheet = this.financeBalanceSheet.length ? this.financeBalanceSheet[0] : {};
    const commBusiness = this.commBusiness.length ? this.commBusiness[0] : {};
    const technology = this.technology.length ? this.technology[0] : {};

    const payload = {
      company_id,
      year,
      quarter,
      month,
      finance_balance_sheet: financeBalanceSheet,
      finance: finance,
      commercial_and_business: commBusiness,
      technology: technology
    };

    this.reportRepository.saveReport(
      payload,
      company_id,
      year,
      quarter,
      month,
    ).subscribe({
      next: (response) => {
        this.toastr.success('Data saved successfully!', 'Success');
        this.clearFilters();
      },
      error: (err) => {
        this.toastr.error('Failed to save data.', 'Error');
      }
    });
  }



  ngOnInit(): void {
    this.selectedCompany = this.companyService.selectedCompany;
  }

  openFileDialog() {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput.click();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.selectedFileName = this.selectedFile.name;
      this.companyForm.get('file')?.setValue(this.selectedFile);
    }
  }

  clearFilters(): void {
    this.companyForm.reset();
    this.selectedFile = null;
    this.selectedFileName = null;
  }

  uploadFile() {
    if (this.companyForm.invalid) {
      this.companyForm.markAllAsTouched();
      this.toastr.error('All fields are mandatory.', 'Oops!', {
        timeOut: 3000,
        closeButton: true,
        positionClass: 'toast-top-right',
        progressBar: true,
      });
      return;
    }

    if (!this.selectedFile) {
      this.toastr.error('Please select a file to upload.', 'Oops!', {
        timeOut: 3000,
        closeButton: true,
        positionClass: 'toast-top-right',
        progressBar: true,
      });
      return;
    }

    const company_id = this.selectedCompany().companyId.toString();
    const month = this.companyForm.get('month')?.value;
    const year = this.companyForm.get('year')?.value.toString();
    const quarter = this.companyForm.get('quarter')?.value;

    console.log('Uploading file with details:', {
      fileName: this.selectedFile.name,
      company_id,
      year,
      quarter,
      month
    });

    this.isUploading = true; // Disable upload button
    this.spinner.show(); // Show loading spinner

    this.reportRepository.uploadReport(this.selectedFile, company_id, year, quarter, month)
      .subscribe({
        next: (response) => {
          console.log('Upload successful:', response);
          this.toastr.success('File uploaded successfully.', 'Success!', {
            timeOut: 3000,
            closeButton: true,
            positionClass: 'toast-top-right',
            progressBar: true,
          });
          // Handle the response data for the table
          if (response && response.data && Array.isArray(response.data)) {
            this.tableData = response.data;
            this.showTable = true;
          } else if (response && response.data) {
            // If data is not an array but an object, convert it to array
            try {
              const parsedData = this.reportParserService.parseReportData(response.data);
              if (parsedData) {
                this.financeBalanceSheet = [parsedData.financeBalanceSheet];
                this.finance = [parsedData.finance];
                this.commBusiness = [parsedData.commercialAndBusiness];
                this.technology = [parsedData.technology];

                this.showTable = true;
              } else {
                this.toastr.warning('Received data is not in expected format.', 'Warning');
              }
              this.showTable = true;
            } catch (err) {
              console.error('Error parsing JSON data:', err);
              this.tableData = [];
              this.showTable = false;
              this.toastr.warning('Received data is not in expected format.', 'Warning');
            }
          } else {
            this.tableData = [];
            this.showTable = false;
          }
        },
        error: (error) => {
          console.error('Upload failed:', error);
          this.toastr.error('File upload failed. Please try again.', 'Error!', {
            timeOut: 3000,
            closeButton: true,
            positionClass: 'toast-top-right',
            progressBar: true,
          });
        },
        complete: () => {
          this.isUploading = false; // Enable upload button
          this.spinner.hide(); // Hide spinner after response
        }
      });
  }


  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
    this.router.navigate(['/login']);
  }
}
