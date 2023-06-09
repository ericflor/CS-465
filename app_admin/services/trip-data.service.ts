import { Injectable } from '@angular/core';
// import { Http } from '@angular/http'; // this import doesn't work, it's deprecated
import { HttpClient, HttpErrorResponse } from '@angular/common/http'; // it's supposed to be this one
import { Trip } from 'models/trip';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

@Injectable()
export class TripDataService {
  constructor(private httpClient: HttpClient) {}

  private apiURL = 'http://localhost:3000/api/';
  private tripURL = `${this.apiURL}trips/`;

  // THE PROMISE PATTERN IS ALSO DEPRECATED, USING MODERN HTTPCLIENT OBSERVABLES INSTEAD

  // public getTrips(): Promise<Trip[]> {
  //   console.log('Inside TripDataService getTrips method');
  //   return this.httpClient
  //     .get(`${this.apiURL}trips`)
  //     .toPromise()
  //     .then(response => response.json() as Trip[])
  //     .catch(this.handleError);
  // }

  // private handleError(error: any): Promise<any> {
  //   console.error('Something has gone wrong: ', error);
  //   return Promise.reject(error.message || error);
  // }

  public getTrips(): Observable<Trip[]> {
    console.log('Inside TripDataService getTrips method');
    return this.httpClient
      .get<Trip[]>(`${this.apiURL}trips`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      // Client-side error occurred
      console.error('An error occurred:', error.error.message);
    } else {
      // Backend returned an unsuccessful response code
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return throwError(() => 'Something went wrong. Please try again later.');
  }

  public addTrip(formData: FormData): Observable<Trip[]> {
    console.log('Inside TripDataService addTrip method');
    return this.httpClient
      .post<Trip[]>(this.tripURL, formData)
      .pipe(catchError(this.handleError));
  }

  // public getTrip(tripCode: string): Promise<Trip> {
  //   console.log('Inside TripDataService#getTrip(tripCode)');
  //   return this.http
  //     .get(this.tripUrl + tripCode)
  //     .toPromise()
  //     .then((response) => response.json() as Trip)
  //     .catch(this.handleError);
  // }

  public getTrip(tripCode: string): Observable<Trip> {
    console.log('Inside TripDataService#getTrip(tripCode)');
    return this.httpClient
      .get<Trip>(`${this.tripURL}${tripCode}`)
      .pipe(catchError(this.handleError));
  }

  // public updateTrip(formData: Trip): Promise<Trip> {
  //   console.log('Inside TripDataService#upateTrip');
  //   console.log(formData);
  //   return this.http
  //     .put(this.tripUrl + formData.code, formData)
  //     .toPromise()
  //     .then((response) => response.json() as Trip[])
  //     .catch(this.handleError);
  // }

  public updateTrip(formData: Trip): Observable<Trip> {
    console.log('Inside TripDataService#updateTrip');
    console.log(formData);
    return this.httpClient
      .put<Trip>(`${this.tripURL}${formData.code}`, formData)
      .pipe(catchError(this.handleError));
  }
}
