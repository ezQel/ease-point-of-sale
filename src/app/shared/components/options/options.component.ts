import {
  AfterViewInit,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  Output,
  QueryList,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { OptionComponent } from '../option/option.component';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss'],
})
export class OptionsComponent implements AfterViewInit {
  @Input() title?: string;
  @Input() value?: string;
  @Input() icon = 'sort';
  @Output() optionChange = new EventEmitter();
  @ContentChildren(OptionComponent) options?: QueryList<OptionComponent>;

  private _value = new BehaviorSubject<string>('');
  currentOption?: string;
  currentOptionIndex = 0;

  ngAfterViewInit(): void {
    this.options?.forEach((option, index) => {
      option.setParentValue(this._value.asObservable());

      option.valueChanges.subscribe(() => {
        this.currentOptionIndex = index;
        this.selectOption(option);
        this.optionChange.emit(option?.value);
      });
    });

    let option = this.options?.first;

    if (this.value) {
      option = this.options?.find((o) => o.value === this.value);
    }

    this.selectOption(option);
  }

  selectNextOption(): void {
    if (!this.options) {
      return;
    }

    this.currentOptionIndex += 1;

    if (this.currentOptionIndex >= this.options?.length) {
      this.currentOptionIndex = 0;
    }

    const option = this.options.get(this.currentOptionIndex);
    this.selectOption(option);
    this.optionChange.emit(option?.value);
  }

  selectOption(option?: OptionComponent): void {
    this.currentOption = option?.text;
    this._value.next(option?.value || '');
    this.icon = option?.icon || this.icon; // Change the icon if the selected option has an icon
  }
}
