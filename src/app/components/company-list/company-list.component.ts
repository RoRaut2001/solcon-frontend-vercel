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

@Component({
  selector: 'app-company-list',
  standalone: true,
  templateUrl: './company-list.component.html',
  imports: [
    NgFor, NgIf, FormsModule, MatIconModule, ReactiveFormsModule
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
    private spinner: NgxSpinnerService
  ) {
    this.reportRepository = reportService;
    this.companyForm = this.fb.group({
      month: ['', Validators.required],
      year: ['', Validators.required],
      quarter: ['', Validators.required],
      file: [null, Validators.required]
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
          this.clearFilters();
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
