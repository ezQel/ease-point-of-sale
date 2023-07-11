import { Component, Input } from '@angular/core';
import { Sale } from 'src/app/shared/models/sale';

@Component({
  selector: 'app-history-printout',
  templateUrl: './history-printout.component.html',
  styleUrls: ['./history-printout.component.scss']
})
export class HistoryPrintoutComponent {
  @Input() salesHistory!: Sale[]

}
