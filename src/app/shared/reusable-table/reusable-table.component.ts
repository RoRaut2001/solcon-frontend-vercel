import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-reusable-table',
  imports: [],
  templateUrl: './reusable-table.component.html',
  styleUrl: './reusable-table.component.css'
})
export class ReusableTableComponent {

  @Input() columnArray: String[]= [];
  @Input() gridData: any[] = [];
}
