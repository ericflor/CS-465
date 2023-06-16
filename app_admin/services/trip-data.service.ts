import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Trip } from 'models/trip';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from 'models/user';
import { AuthResponse } from 'models/authresponse';
import { BROWSER_STORAGE } from 'src/app/storage';
import jwt_decode from 'jwt-decode';


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


  // public addTrip(formData: FormData): Observable<Trip[]> {
  //   const headers = this.getHeadersWithToken();
  //   return this.httpClient.post<Trip[]>(this.tripURL, formData, { headers }).pipe(
  //     catchError((error: HttpErrorResponse) => {
  //       return throwError('Something went wrong. Please try again later.');
  //     })
  //   );
  // }


  // public updateTrip(formData: Trip): Observable<Trip> {
  //   const headers = this.getHeadersWithToken();
  //   return this.httpClient.put<Trip>(`${this.tripURL}${formData.code}`, formData, { headers }).pipe(
  //     catchError((error: HttpErrorResponse) => {
  //       return throwError('Something went wrong. Please try again later.');
  //     })
  //   );
  // }

  public addTrip(formData: FormData): Observable<Trip[]> {
    var headers = this.getHeadersWithToken();
    const token = localStorage.getItem('travlr-token');
    if (token) {
      const decodedToken = jwt_decode(token) as { email: string };
      const email = decodedToken.email;
      headers = headers.set('Email', email);
    }
    return this.httpClient.post<Trip[]>(this.tripURL, formData, { headers }).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError('Something went wrong. Please try again later.');
      })
    );
  }

  public updateTrip(formData: Trip): Observable<Trip> {
    var headers = this.getHeadersWithToken();
    const token = localStorage.getItem('travlr-token');
    if (token) {
      const decodedToken = jwt_decode(token) as { email: string };
      const email = decodedToken.email;
      headers = headers.set('Email', email);
    }
    return this.httpClient.put<Trip>(`${this.tripURL}${formData.code}`, formData, { headers }).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError('Something went wrong. Please try again later.');
      })
    );
  }



  private getHeadersWithToken(): HttpHeaders {
    const token = localStorage.getItem('travlr-token');
    let headers = new HttpHeaders();

    if (token) {
      const decodedToken = jwt_decode(token) as { email: string };
      const email = decodedToken.email;

      headers = headers.set('Authorization', `Bearer ${token}`);
      headers = headers.set('Email', email);
    }

    return headers;
  }


  public deleteTrip(tripCode: string): Observable<any> {
    const headers = this.getHeadersWithToken();
    return this.httpClient.delete(`${this.tripURL}${tripCode}`, { headers }).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError('Something went wrong. Please try again later.');
      })
    );
  }

  public getTrips(): Observable<Trip[]> {
    console.log('Inside TripDataService getTrips method');
    return this.httpClient.get<Trip[]>(`${this.apiURL}trips`).pipe(
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

  public login(user: User): Observable<AuthResponse> {
    return this.makeAuthApiCall('login', user);
  }

  public register(user: User): Observable<AuthResponse> {
    return this.makeAuthApiCall('register', user);
  }

  private makeAuthApiCall(urlPath: string, user: User): Observable<AuthResponse> {
    const url: string = `${this.apiURL}${urlPath}`;
    return this.httpClient.post<AuthResponse>(url, user).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError('Something went wrong. Please try again later.');
      })
    );
  }




  // public updateTrip(formData: Trip): Observable<Trip> {
  //   console.log('Inside TripDataService#updateTrip');
  //   console.log(formData);
  //   return this.httpClient.put<Trip>(`${this.tripURL}${formData.code}`, formData).pipe(
  //     catchError((error: HttpErrorResponse) => {
  //       return throwError('Something went wrong. Please try again later.');
  //     })
  //   );
  // }

  // public deleteTrip(tripCode: string): Observable<any> {
  //   console.log('Inside TripDataService#deleteTrip');
  //   return this.httpClient.delete(`${this.tripURL}${tripCode}`).pipe(
  //     catchError((error: HttpErrorResponse) => {
  //       return throwError('Something went wrong. Please try again later.');
  //     })
  //   );
  // }

  // public login(user: User): Observable<AuthResponse> {
  //   return this.makeAuthApiCall('user/login', user);
  // }

  // public register(user: User): Observable<AuthResponse> {
  //   return this.makeAuthApiCall('user/register', user);
  // }

  // private makeAuthApiCall(urlPath: string, user: User): Observable<AuthResponse> {
  //   const url: string = `${this.apiURL}${urlPath}`;
  //   return this.httpClient.post<AuthResponse>(url, user).pipe(
  //     catchError((error: HttpErrorResponse) => {
  //       return throwError('Something went wrong. Please try again later.' + error);
  //     })
  //   );
  // }

  // public addTrip(formData: FormData): Observable<Trip[]> {
  //   console.log('Inside TripDataService addTrip method');
  //   return this.httpClient.post<Trip[]>(this.tripURL, formData).pipe(
  //     catchError((error: HttpErrorResponse) => {
  //       return throwError('Something went wrong. Please try again later.');
  //     })
  //   );
  // }



  // public getTrip(tripCode: string): Observable<Trip> {
  //   const headers = this.getHeadersWithToken();
  //   return this.httpClient.get<Trip>(`${this.tripURL}${tripCode}`, { headers }).pipe(
  //     catchError((error: HttpErrorResponse) => {
  //       return throwError('Something went wrong. Please try again later.');
  //     })
  //   );
  // }

  // public getTrips(): Observable<Trip[]> {
  //   const headers = this.getHeadersWithToken();
  //   return this.httpClient.get<Trip[]>(`${this.apiURL}trips`, { headers }).pipe(
  //     catchError((error: HttpErrorResponse) => {
  //       return throwError('Something went wrong. Please try again later.');
  //     })
  //   );
  // }
}
