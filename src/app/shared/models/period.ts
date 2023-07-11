import * as firestore from 'firebase/firestore';

export class Period {
  start!: firestore.Timestamp;
  end!: firestore.Timestamp;

  constructor(start?: string | null, end?: string | null) {
    this.setStart(start);
    this.setEnd(end);
  }

  private setStart(start: string | null | undefined): void {
    const startDate = start ? new Date(start) : new Date();

    // Set time to beginging of day -> 00:00:00:000
    startDate.setHours(0);
    startDate.setMinutes(0);
    startDate.setSeconds(0);
    startDate.setMilliseconds(0);

    this.start = firestore.Timestamp.fromDate(startDate);
  }

  private setEnd(end: string | null | undefined): void {
    const endDate = end ? new Date(end) : new Date();

    // Set time to end of day i,e. 23:59:59:999
    endDate.setHours(23);
    endDate.setMinutes(59);
    endDate.setSeconds(59);
    endDate.setMilliseconds(999);

    this.end = firestore.Timestamp.fromDate(endDate);
  }
}
