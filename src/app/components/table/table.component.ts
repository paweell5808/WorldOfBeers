import { OnInit , OnDestroy, Component, Input, ViewChild} from '@angular/core';
import { Beer } from '../../interfaces/beer';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { DialogComponent } from '../dialog/dialog.component';
import { LocalStorageService } from '../../services/local-storage.service';
import { OptionsService } from '../../services/options.service';
import { BeersService } from '../../services/beers.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})

export class TableComponent implements OnInit, OnDestroy {
  @Input() selectedValue?: Observable<string>;
  @Input() tableNumber?: string;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  dataSource: MatTableDataSource<Beer>;
  displayedColumns: string[] = ['name', 'type', 'price', 'image_url'];
  pageSize: number;

  getBeersValues;
  getOptionsValues;
  getSelectedValues;

  constructor(public dialog: MatDialog, private storage: LocalStorageService,
              private optionsService: OptionsService, private beersService: BeersService) {}

  ngOnInit(): void {
    this.getBeers();
  }

  ngOnDestroy(): void {
    this.getBeersValues.unsubscribe();
    this.getOptionsValues.unsubscribe();
    this.getSelectedValues.unsubscribe();
  }

  private getBeers(): void {
    this.getBeersValues = this.beersService.getBeers().subscribe(beers => {
      this.dataSource = new MatTableDataSource(beers);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;

      this.setTableOptions();
      this.filterTable();
    });
  }

  private setTableOptions(): void {
    this.getOptionsValues = this.optionsService.getOptions().subscribe(config => {
      if (this.dataSource) {
        this.dataSource.paginator._changePageSize(config.pageSize);
      }
      this.pageSize = config.pageSize;

      const sortState: Sort = {active: config.sortBy, direction: config.sortOrder};
      this.sort.active = sortState.active;
      this.sort.direction = sortState.direction;
      this.sort.sortChange.emit(sortState);
    });
  }

  private filterTable(): void {
    this.getSelectedValues = this.selectedValue.subscribe(value => {
      this.dataSource.filterPredicate = (data: Beer, filter: string) => {
        return data.brewer === filter;
      };
      this.dataSource.filter = value;
      this.addValuesToCache(value);
    });
  }

  // Open dialog with full size image
  openDialog(url: string): void {
    const dialogRef = this.dialog.open(DialogComponent);
    dialogRef.componentInstance.url = url;
  }

  // Add selected value from Select component to Local Storage
  private addValuesToCache(value): void {
    const optionStorageItems = this.storage.get('selectedValues') || {};
    const newStorageObject = {
      [this.tableNumber]: value
    };
    this.storage.set('selectedValues', Object.assign(optionStorageItems, newStorageObject));
  }
}
