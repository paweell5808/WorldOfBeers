import { Component, Input, OnInit } from '@angular/core';
import { BeersService } from '../services/beers.service';
import { MatSelectChange } from '@angular/material/select';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})

export class DropdownComponent implements OnInit {
  @Input() dropNumber?: string;

  brewers = [];
  selectedValue: string;

  getSelectedValueSubject = new BehaviorSubject<string>('&nbsp');

  constructor(private beersService: BeersService, private storage: LocalStorageService) { }

  ngOnInit(): void {
    this.getBrewers();
  }

  getBrewers(): void {
    this.beersService.getBeers.subscribe(beers => {
      beers.forEach(beer => {
        // Add unique brewer to array
        if (this.brewers.indexOf(beer.brewer) === -1) {
          this.brewers.push(beer.brewer);
        }
      });
      // This sort brewers in ascending order
      this.brewers.sort((a, b) => (a > b) ? 1 : -1);
      this.setSelectedValue();
    });
  }

  onOptionsSelected(event: MatSelectChange): void {
    this.getSelectedValueSubject.next(event.value);
  }

  // Set cached value to selectedValue if exist
  setSelectedValue(): void {
    const optionStorageItems = this.storage.get('selectedValues');
    if (optionStorageItems && optionStorageItems[this.dropNumber]) {
      this.selectedValue = optionStorageItems[this.dropNumber];
      this.getSelectedValueSubject.next(optionStorageItems[this.dropNumber]);
    }
  }
}
