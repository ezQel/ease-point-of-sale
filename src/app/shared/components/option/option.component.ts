import {
  AfterViewInit,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { Observable } from 'rxjs';
import { OptionsComponent } from '../options/options.component';

@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.scss'],
})
export class OptionComponent implements AfterViewInit {
  @Input() value?: string;
  @Input() icon?: string;
  @ViewChild('option') option?: ElementRef;
  @Output() valueChanges = new EventEmitter();
  @ContentChild(OptionsComponent) options?: OptionsComponent;

  text? = '';
  parentValue?: Observable<string>;
  active = false;

  @HostListener('click') emitValue(): void {
    this.valueChanges.emit(this.value);
  }

  ngAfterViewInit(): void {
    this.text = this.option?.nativeElement?.textContent;
  }

  setParentValue(value$: Observable<string>): void {
    this.parentValue = value$;

    this.parentValue?.subscribe((value) => {
      this.active = this.value === value;
    });
  }
}
