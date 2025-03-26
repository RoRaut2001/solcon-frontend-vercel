import {Component, HostListener} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NgxSpinnerComponent} from 'ngx-spinner';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgxSpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'solcon-frontend';

  @HostListener('window:focusin', ['$event'])
  onFocusIn(event: FocusEvent): void {
    const activeElement = document.activeElement as HTMLElement;
    const isMobile = window.innerWidth <= 768; // Adjust for mobile screens

    if (isMobile && activeElement && (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA')) {
      setTimeout(() => {
        window.scrollTo({
          top: activeElement.getBoundingClientRect().top + window.scrollY - 100, // Moves input just above keyboard
          behavior: 'smooth'
        });
      }, 200);
    }
  }
}
