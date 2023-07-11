import { Directive, HostListener, Input } from '@angular/core';
import { PrinterService } from '../services/printer.service';

@Directive({
  selector: '[appPrint]',
})
export class PrintDirective {
  /**
   * The id of the section that is to be printed
   */
  @Input('appPrint') printSectionId!: string;

  /**
   *  Prints the html section whose id is the 'printSectionId'
   */
  @HostListener('click') print() {
    this.printer.print(this.printSectionId);
  }

  constructor(private printer: PrinterService) {}
}
