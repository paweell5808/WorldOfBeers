import {Component, EventEmitter} from '@angular/core';
import {MatSlideToggleChange} from '@angular/material/slide-toggle';
import { DefaultOptions } from '../interfaces/default-options';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})

export class DialogComponent {
  url: string;
  optionsDialog: boolean;
  options: DefaultOptions;

  readonly optionsChange = new EventEmitter<boolean>();

  toggle(event: MatSlideToggleChange): void {
    this.options.theme = event.checked ? 'theme-dark' : 'theme-light';
    this.optionsChange.emit();
  }

  changeValue(): void {
    this.optionsChange.emit();
  }
}
