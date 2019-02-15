/**
 * @author - Shahbaz Shaikh
 * @description - This Pagination Component are reusable component for Table  Pagination.
 */
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
// ----------------------------------------------------- //

@Component({
  selector: 'ims-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  // Declear the variable
  public start: number; // Starting Page number
  public end: number; // Ending Page number
  public pageSize: number; // Number of items on each page
  public currentPage: number; // Returns the current page number
  public total: number; // Total number of items in the records
  public readonly pageLimitOptions; // Page change limit value declear

  // Triggers on Next and previous button page change
  @Output() public pageChange = new EventEmitter();
  // Triggers the pageSizeChange event with the page number
  @Output() public pageSizeChange = new EventEmitter<number>();

  // Set the Page Size
  @Input('size')
  set PageSize(pageSize: number) {
    if (pageSize) {
      this.pageSize = pageSize;
    } else {
      this.pageSize = 0;
    }
    this.calculate();
  }

  // Set Current page number
  @Input('current')
  set CurrentPage(currentPage: number) {
    if (currentPage) {
      this.currentPage = currentPage;
    } else {
      this.currentPage = 0;
    }
    this.calculate();
  }

  // Set total record
  @Input('total')
  set TotatRecord(total: number) {
    if (total) {
      this.total = total;
    } else {
      this.total = 0;
    }
    this.calculate();
  }

  constructor() {
    // Define the variables
    this.start = 0;
    this.end = 0;

    // Define the page change limit opation
    this.pageLimitOptions = [
      { value: 10 },
      { value: 20 },
      { value: 30 },
      { value: 40 },
      { value: 50 },
      { value: 100 },
    ];
  }

  ngOnInit() {
  }


  // When user user change of page limit change the page limit
  public goToPage(event) {
    this.pageSizeChange.emit(event.target.value);
  }

  public goNextPrev(e) {
    this.pageChange.emit(e.target.value);
  }

  private calculate() {
    if (this.total > 0) {
      const startIndex = (this.currentPage * this.pageSize) - this.pageSize;
      const endIndex = this.currentPage * this.pageSize;

      this.start = startIndex + 1;
      this.end = endIndex > this.total ? this.total : endIndex;
    } else {
      this.start = 0;
      this.end = 0;
    }
  }
}

