import {Component, HostBinding, Inject, OnInit, Renderer2,} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { DOCUMENT } from '@angular/common';
import { LocalStorageService } from '../services/local-storage.service';
import { DefaultOptions } from '../interfaces/default-options';
import {OptionsService} from '../services/options.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  options: DefaultOptions;

  constructor(public dialog: MatDialog, @Inject(DOCUMENT) private document: Document, private renderer: Renderer2,
              private optionsService: OptionsService) {}

  ngOnInit(): void {
    this.optionsService.getOptions.subscribe(config => {
      this.options = config;
      this.renderer.setAttribute(this.document.body, 'class', config.theme);
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent);

    dialogRef.componentInstance.optionsDialog = true;
    dialogRef.componentInstance.options = this.options;
    dialogRef.componentInstance.optionsChange.subscribe(() => {
      this.optionsService.setOptions(this.options);
    });
  }
}
