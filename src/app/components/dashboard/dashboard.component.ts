import { Component } from '@angular/core';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { rationList } from '../../../assets/ration-list.json';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  imports: [ReactiveFormsModule, FormsModule, CommonModule, TableModule],
})
export class DashboardComponent {
  pendingCards: any[] = [];
  totalList: any[] = rationList;

  loading = false;

  normalize(str: any): string {
    return String(str || '')
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '');
  }

  onFileChange(event: any) {
    const file = event.target.files?.[0];
    if (!file) return;

    this.loading = true;

    const reader = new FileReader();

    reader.onload = (e: any) => {
      const workbook = XLSX.read(e.target.result, { type: 'binary' });

      const sheet = workbook.Sheets[workbook.SheetNames[0]];

      const rows: any[][] = XLSX.utils.sheet_to_json(sheet, {
        header: 1,
      });

      const tmpData = rows
        .slice(3)
        .filter((r) => r[0] !== 'Total')
        .map((r) => ({
          rationCardNo: r[1],
        }));
console.log(this.totalList)
      this.generateUnmatched(this.totalList, tmpData);

      this.loading = false;
    };

    reader.readAsBinaryString(file);
  }

  generateUnmatched(rationList: any[], tmpData: any[]) {
    const consumedSet = new Set(
      tmpData.map((x) => this.normalize(x.rationCardNo))
    );

    this.pendingCards = rationList.filter(
      (item) => !consumedSet.has(this.normalize(item.rationCardNo))
    );

    console.log('Unmatched:', this.pendingCards.length);
  }

  exportToExcel() {
    const exportData = this.pendingCards.map((item, i) => ({
      'S.No': i + 1,
      'RC No': item.rationCardNo,
      'Family Head': item.familyHead,
      Units: item.Units,
      Scheme: item.Scheme,
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);

    const workbook = {
      Sheets: { data: worksheet },
      SheetNames: ['data'],
    };

    const buffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });

    const blob = new Blob([buffer], {
      type: 'application/octet-stream',
    });

    FileSaver.saveAs(blob, `pending_cards.xlsx`);
  }
}