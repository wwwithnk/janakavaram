import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { rationList } from '../../../assets/ration-list.json';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
@Component({
  selector: 'app-total-cards',
  imports: [ReactiveFormsModule, FormsModule, CommonModule,  TableModule,DropdownModule,
   ButtonModule,
   CardModule],
  templateUrl: './total-cards.component.html',
  styleUrl: './total-cards.component.css'
})
export class TotalCardsComponent {
totalList:any = rationList
pendingPage = 1;
totalPage = 1;
 currentPage = 1;
  pageSize = 20;
  totalPages = 1;
  pagedPendingCards:any

pageSizeOptions = [
  { label: '50', value: 50 },
  { label: '100', value: 100 },
  { label: '200', value: 200 }
];
ngOnInit(): void {
 this.updatePagination() 
}
  updatePagination1() {
    this.totalPages = Math.ceil(this.totalList.length / this.pageSize);
    this.currentPage = Math.min(this.currentPage, this.totalPages) || 1;

    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedPendingCards = this.totalList.slice(startIndex, endIndex);
  }
    goToPage1(page: number) {
    if (page < 1) page = 1;
    if (page > this.totalPages) page = this.totalPages;
    this.currentPage = page;
    this.updatePagination();
  }
  exportToExcel(): void {
      const exportData = this.totalList.map((item: any, index: any) => ({
        'S.No': index + 1,
        'RC No': item.rationCardNo,
        'Family Head': item.familyHead,
        Units: item.Units,
        'Fortified Rice (Kgs)': item.fortifiedRice,
      }));
  
      const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(exportData);
      worksheet['!cols'] = [
        { wch: 6 }, // S.No
        { wch: 20 }, // RC No
        { wch: 25 }, // Family Head
        { wch: 10 }, // Units
        { wch: 20 }, // Fortified Rice
      ];
  
      const workbook: XLSX.WorkBook = {
        Sheets: { 'Pending Cards': worksheet },
        SheetNames: ['Pending Cards'],
      };
  
      const excelBuffer: any = XLSX.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });
  
      const blob = new Blob([excelBuffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
      });
  const now = new Date();
  const dateString = now.toISOString().slice(0,19).replace(/:/g, '-'); 
      FileSaver.saveAs(blob, `Pending_Cards_${dateString}.xlsx`);
    }

    
  
  updatePagination() {
    // Sort first
    let sortedList = [...this.totalList];
    if (this.sortField) {
      sortedList.sort((a, b) => {
        const valueA = a[this.sortField];
        const valueB = b[this.sortField];

        // Check if value is numeric or string
        if (!isNaN(valueA) && !isNaN(valueB)) {
          // numeric comparison
          return this.sortDirection === 'asc' ? valueA - valueB : valueB - valueA;
        } else {
          // string comparison
          return this.sortDirection === 'asc' 
            ? String(valueA).localeCompare(String(valueB)) 
            : String(valueB).localeCompare(String(valueA));
        }
      });
    }

    this.totalPages = Math.ceil(sortedList.length / this.pageSize);
    this.currentPage = Math.min(this.currentPage, this.totalPages) || 1;

    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedPendingCards = sortedList.slice(startIndex, endIndex);
  }

  goToPage(page: number) {
    if (page < 1) page = 1;
    if (page > this.totalPages) page = this.totalPages;
    this.currentPage = page;
    this.updatePagination();
  }

  sortField: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  // Call this on clicking a header
  sortBy(field: string) {
    if (this.sortField === field) {
      // toggle direction
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDirection = 'asc';
    }
    this.updatePagination();
  }
  changePageSize() {

  this.currentPage = 1;

  this.totalPages = Math.ceil(
    this.totalList.length / this.pageSize
  );

  this.loadPagedData();
}
loadPagedData() {

  const startIndex = 
    (this.currentPage - 1) * this.pageSize;

  const endIndex = 
    startIndex + this.pageSize;

  this.pagedPendingCards =
    this.totalList.slice(startIndex, endIndex);

}
}
