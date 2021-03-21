import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Beer } from '../interfaces/beer';

@Injectable({
  providedIn: 'root'
})
export class BeersService {
  public beersUrl = '/beers/';
  public beers = new Subject<Beer[]>();

  constructor(public http: HttpClient) {
    this.fetchBeers().subscribe(
      beers => this.beers.next(beers),
      error => console.error(error.message)
    );
  }

  getBeers = this.beers.asObservable();

  fetchBeers(): Observable<Beer[]> {
    return this.http.get<Beer[]>(this.beersUrl);
  }

}
