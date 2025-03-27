import {Component, HostListener, OnInit, signal} from '@angular/core';
import {Router} from '@angular/router';
import {LeftSidebarComponent} from '../left-sidebar/left-sidebar.component';
import {MainComponent} from '../main/main.component';

@Component({
  selector: 'app-dashboard',
  standalone: true, // ✅ Required for standalone setup
  templateUrl: './dashboard.component.html',
  imports: [
    LeftSidebarComponent,
    MainComponent
  ],
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  isLeftSidebarCollapsed = signal<boolean>(false);
  screenWidth =signal<number>(window.innerWidth);

  @HostListener('window:resize') onResize() {

    this.screenWidth.set(window.innerWidth);
    if (this.screenWidth() <= 768) {
      this.isLeftSidebarCollapsed.set(true);
    }
  }

  constructor(private router: Router) {}

  changeIsLeftSidebarCollapsed(isLeftSidebarCollapsed: boolean): void {
    this.isLeftSidebarCollapsed.set(isLeftSidebarCollapsed);
  }

  ngOnInit(): void {
    this.isLeftSidebarCollapsed.set(this.screenWidth()<768);
  }

}


