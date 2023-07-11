import { formatDate } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Period } from '../../models/period';

type DateRange = { start: string; end: string };

@Component({
  selector: 'app-period',
  templateUrl: './period.component.html',
  styleUrls: ['./period.component.scss'],
})
export class PeriodComponent implements OnInit {
  /***
   * Event trigered when a user changes the date range in the period picker
   */
  @Output() periodChange = new EventEmitter();

  /**
   * Today's Date in 'M/d/yyyy' format
   */
  today = formatDate(new Date(), 'M/d/yyyy', 'en');

  /**
   * Form for 'from' and 'to' date filters
   */
  periodForm = new FormGroup({
    start: new FormControl(this.today),
    end: new FormControl(this.today),
  });

  constructor() {
    this.periodForm.valueChanges.subscribe((dateRange) => {
      const period = new Period(dateRange.start, dateRange.end);
      this.periodChange.emit(period);
    });
  }

  ngOnInit(): void {
    const period = new Period();
    this.periodChange.emit(period);
  }

  /**
   * Check if the 'from' date and 'to' date of the period is the same
   */
  get isSameDay(): boolean {
    const dates = <DateRange>this.periodForm.value;
    const fromDate = formatDate(dates.start, 'M/d/yyyy', 'en');
    const toDate = formatDate(dates.end, 'M/d/yyyy', 'en');
    return fromDate === toDate;
  }

  /**
   * Check if the 'from' date of the period is today
   */
  get isToday(): boolean {
    const dates = <DateRange>this.periodForm.value;
    const fromDate = formatDate(dates.start, 'M/d/yyyy', 'en');
    return fromDate === this.today;
  }
}
