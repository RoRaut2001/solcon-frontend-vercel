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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['jsonData'] && this.jsonData && this.jsonData.length > 0) {
      // Extract all unique column keys from all objects
      this.columns = Array.from(
        new Set(this.jsonData.flatMap(item => Object.keys(item)))
      );
    }
  }

  startEditing(index: number): void {
    this.editingRow = index;
    this.editValues = { ...this.jsonData[index] };
  }

  cancelEditing(): void {
    this.editingRow = null;
    this.editValues = {};
  }

  saveRow(index: number): void {
    this.jsonData[index] = { ...this.editValues };
    this.dataChanged.emit(this.jsonData);
    this.editingRow = null;
  }

  deleteRow(index: number): void {
    if (confirm('Are you sure you want to delete this row?')) {
      this.jsonData.splice(index, 1);
      this.dataChanged.emit(this.jsonData);
    }
  }

  addRow(): void {
    const newRow: any = {};
    // Initialize with empty values for all columns
    this.columns.forEach(col => {
      newRow[col] = '';
    });

    this.jsonData.push(newRow);
    this.startEditing(this.jsonData.length - 1);
  }

   formatTableHeader(snakeCase: string): string {
    return snakeCase
      .split('_') // Split by underscore
      .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
      .join(' '); // Join with space
  }
}
