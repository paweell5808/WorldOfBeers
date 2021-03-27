import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { BeersService } from '../../services/beers.service';
import { MatSelectChange } from '@angular/material/select';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})

export class DropdownComponent implements OnInit, OnDestroy {
  @Input() dropNumber?: string;

  getBrewersValues;
  brewers = [];
  selectedValue: string;

  selectedValueSubject = new BehaviorSubject<string>('&nbsp');

  constructor(private beersService: BeersService, private storage: LocalStorageService) { }

  ngOnInit(): void {
    this.getBrewers();
  }

  ngOnDestroy(): void {
    this.getBrewersValues.unsubscribe();
  }

  getBrewers(): void {
    this.getBrewersValues = this.beersService.getBrewers().subscribe(brewers => {
      this.brewers = brewers;
      this.setSelectedValue();
    });
  }

  onOptionsSelected(event: MatSelectChange): void {
    this.selectedValueSubject.next(event.value);
  }

  // Set cached value to selectedValue if exist
  setSelectedValue(): void {
    const optionStorageItems = this.storage.get('selectedValues');
    if (optionStorageItems && optionStorageItems[this.dropNumber]) {
      this.selectedValue = optionStorageItems[this.dropNumber];
      this.selectedValueSubject.next(optionStorageItems[this.dropNumber]);
    }
  }
}
