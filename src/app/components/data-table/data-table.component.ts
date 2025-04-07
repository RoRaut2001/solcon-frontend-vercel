import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule],
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnChanges {
  @Input() jsonData: any[] = [];
  @Output() dataChanged = new EventEmitter<any[]>();

  columns: string[] = [];
  editingRow: number | null = null;
  editValues: any = {};
  isEditable = false; // <-- Controls whether table can be edited

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['jsonData'] && this.jsonData && this.jsonData.length > 0) {
      this.columns = Array.from(
        new Set(this.jsonData.flatMap(item => Object.keys(item)))
      );
      this.editValues = { ...this.jsonData[0] }; // Clone the only row
    }
  }

  startEditing(index: number): void {
    if (!this.isEditable) return; // Prevent editing if toggle is off
    this.editingRow = index;
    this.editValues = { ...this.jsonData[index] };
  }

  save(): void {
    this.jsonData[0] = { ...this.editValues };
    this.dataChanged.emit(this.jsonData);
    this.toggleEdit();
  }



  toggleEdit(): void {
    this.isEditable = !this.isEditable;

    /* only initialize editValues when enabling edit mode */
    if (this.isEditable && this.jsonData.length > 0) {
      this.editValues = { ...this.jsonData[0] }; /* copy existing values */
    }
  }



  formatTableHeader(snakeCase: string): string {
    return snakeCase
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
}
