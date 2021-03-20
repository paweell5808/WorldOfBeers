import {Component, Input, OnInit} from '@angular/core';
import { BeersService } from '../services/beers.service';
import { Beer } from '../interfaces/beer';
import { MatSelectChange } from '@angular/material/select';
import { of, from, Observable, pipe, Subject, BehaviorSubject } from 'rxjs';
import {LocalStorageService} from '../services/local-storage.service';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})

export class DropdownComponent implements OnInit {
  @Input() dropNumber?: string;

  brewers = [];
  cachedValue: string;

  getBeersSubject = new Subject<Beer[]>();
  getSelectedValueSubject = new Subject<string>();

  constructor(private beersService: BeersService, private storage: LocalStorageService) { }

  ngOnInit(): void {
    this.getBeers();
  }

  getBeers(): void {
    // obsluzyc blad,
    this.beersService.getBeers()
      .subscribe(beers => {
        this.getBeersSubject.next(beers);
        beers.forEach(beer => {
          // Add unique brewer to array
          if (this.brewers.indexOf(beer.brewer) === -1) {
            this.brewers.push(beer.brewer);
          }
        });
        // This sort brewers in ascending order
        this.brewers.sort((a, b) => (a > b) ? 1 : -1);
        // Set cached items to mat-select value and fill table
        this.setCachedItemsToTable();
      });
  }

  onOptionsSelected(event: MatSelectChange): void {
    this.getSelectedValueSubject.next(event.value);
  }

  setCachedItemsToTable(): void {
    const optionStorageItems = this.storage.get('selectedValues');
    if (optionStorageItems && optionStorageItems[this.dropNumber]) {
      this.cachedValue = optionStorageItems[this.dropNumber];
      this.getSelectedValueSubject.next(optionStorageItems[this.dropNumber]);
    }
  }
}
