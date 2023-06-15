import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Trip } from 'models/trip';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from 'models/user';
import { AuthResponse } from 'models/authresponse';
import { BROWSER_STORAGE } from 'src/app/storage';

@Injectable({
  providedIn: 'root',
})
export class TripDataService {
  constructor(
    private httpClient: HttpClient,
    @Inject(BROWSER_STORAGE) private storage: Storage
  ) {}

  private apiURL = 'http://localhost:3000/api/';
  private tripURL = `${this.apiURL}trips/`;

  public getTrips(): Observable<Trip[]> {
    console.log('Inside TripDataService getTrips method');
    return this.httpClient.get<Trip[]>(`${this.apiURL}trips`).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError('Something went wrong. Please try again later.');
      })
    );
  }

  public addTrip(formData: FormData): Observable<Trip[]> {
    console.log('Inside TripDataService addTrip method');
    return this.httpClient.post<Trip[]>(this.tripURL, formData).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError('Something went wrong. Please try again later.');
      })
    );
  }

  public getTrip(tripCode: string): Observable<Trip> {
    console.log('Inside TripDataService#getTrip(tripCode)');
    return this.httpClient.get<Trip>(`${this.tripURL}${tripCode}`).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError('Something went wrong. Please try again later.');
      })
    );
  }

  public updateTrip(formData: Trip): Observable<Trip> {
    console.log('Inside TripDataService#updateTrip');
    console.log(formData);
    return this.httpClient.put<Trip>(`${this.tripURL}${formData.code}`, formData).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError('Something went wrong. Please try again later.');
      })
    );
  }

  public deleteTrip(tripCode: string): Observable<any> {
    console.log('Inside TripDataService#deleteTrip');
    return this.httpClient.delete(`${this.tripURL}${tripCode}`).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError('Something went wrong. Please try again later.');
      })
    );
  }

  public login(user: User): Observable<AuthResponse> {
    return this.makeAuthApiCall('login', user);
  }

  public register(user: User): Observable<AuthResponse> {
    return this.makeAuthApiCall('register', user);
  }

  private makeAuthApiCall(urlPath: string, user: User): Observable<AuthResponse> {
    const url: string = `${this.apiURL}/${urlPath}`;
    return this.httpClient.post<AuthResponse>(url, user).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError('Something went wrong. Please try again later.');
      })
    );
  }
}
