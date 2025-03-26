import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  constructor(private spinner: NgxSpinnerService) {}

  show(): void {
    this.spinner.show(undefined, {
      type: 'square-jelly-box', // ✅ Change Spinner Type if needed
      size: 'medium',
      bdColor: 'rgba(0, 0, 0, 0.8)',
      color: '#ffffff'
    });
  }

  hide(): void {
    this.spinner.hide();
  }
}
