/**
 * @author sonal prajapati
 * @description This derective represent to update the satus background color.
 */
import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[imsStatus]'
})
export class StatusDirective {

  constructor(private el: ElementRef) {
  }
  /**
   * Get the status of the data
   */
  @Input() set status(value) {
    const status = value;
    if (status) {
      this.statusColor(status);
    }
  }
  public statusColor(status) {
    if (status === 'Draft') {
      this.el.nativeElement.style.backgroundColor = 'grey';
    } else if (status === 'Sent') {
      this.el.nativeElement.style.backgroundColor = 'dodgerblue';
    } else if (status === 'Invoiced') {
      this.el.nativeElement.style.backgroundColor = 'green';
    } else if (status === 'Paid') {
      this.el.nativeElement.style.backgroundColor = 'green';
    } else if (status === 'Expired') {
      this.el.nativeElement.style.backgroundColor = 'red';
    }
  }
}

