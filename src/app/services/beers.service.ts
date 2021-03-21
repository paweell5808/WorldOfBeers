import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Beer } from '../interfaces/beer';

@Injectable({
  providedIn: 'root'
})
export class BeersService {
  private beersUrl = '/beers/';
  private beers = new Subject<Beer[]>();

  constructor(private http: HttpClient) {
    this.fetchBeers();
  }

  getBeers = this.beers.asObservable();

  fetchBeers(): void {
    this.http.get<Beer[]>(this.beersUrl).subscribe(
      beers => this.beers.next(beers),
      error => console.error(error.message)
    );
  }

}
