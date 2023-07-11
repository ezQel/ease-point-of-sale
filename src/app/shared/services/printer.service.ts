import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PrinterService {
  print(id: string): void {
    // Wait for half a second for dialogs to close or change detection
    setTimeout(() => {
      // Get the element that is to be printed
      const printout = document.getElementById(id);

      if (!printout) {
        throw new Error('Printout elemnt not found');
      }

      // Get the printer outlet element
      const printerOutlet = document.getElementById('printer-outlet');

      if (!printerOutlet) {
        throw new Error('Printer outlet element not found');
      }

      printerOutlet.innerHTML = printout.innerHTML;

      window.print();
    }, 500);
  }
}
