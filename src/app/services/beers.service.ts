import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, share } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Beer } from '../interfaces/beer';

@Injectable({
  providedIn: 'root'
})

export class BeersService {
  public beersUrl = '/beers/';
  public beers: Observable<Beer[]> = this.http.get<Beer[]>(this.beersUrl).pipe(
    share(),
    catchError(this.handleError),
  );

  constructor(public http: HttpClient) {}

  getBeers(): Observable<Beer[]> {
    return this.beers;
  }

  getBrewers(): Observable<Beer[]> {
    return this.getBeers().pipe(
      map(beers => {
        const beersArray = [];
        beers.forEach(beer => {
          // Add unique brewer to array
          if (beersArray.indexOf(beer.brewer) === -1) {
            beersArray.push(beer.brewer);
          }
        });
        // This sort brewers in ascending order
        beersArray.sort((a, b) => (a > b) ? 1 : -1);
        return beersArray;
      })
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    const errorMessage = `Error Code: ${error.status} Message: ${error.message}`;
    console.error(errorMessage);
    return throwError(errorMessage);
  }

}
