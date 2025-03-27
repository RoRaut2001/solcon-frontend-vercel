import {Component, computed, input, OnInit} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-main',
  standalone: true,
  templateUrl: './main.component.html',
  imports: [
    RouterOutlet
  ],
  styleUrls: ['./main.component.css']
})
export class MainComponent  {

  isLeftSidebarCollapsed = input.required<boolean>();
  screenWidth = input.required<number>();

  sizeClass = computed(() => {
    const isCollapsed = this.isLeftSidebarCollapsed();

    // If sidebar is collapsed, use default body size
    if (isCollapsed) {
      return 'body-md-screen'; // Ensures correct margin for collapsed state
    }

    // Use full width when sidebar is expanded
    return this.screenWidth() > 768 ? 'body-trimmed' : 'body-md-screen';
  });

}
