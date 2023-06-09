import { Component, OnInit } from '@angular/core';
import { trips } from '../data/trips';
import { Trip } from 'models/trip';
import { TripDataService } from 'services/trip-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trip-listing',
  templateUrl: './trip-listing.component.html',
  styleUrls: ['./trip-listing.component.css'],
})
export class TripListingComponent implements OnInit {
  // trips: Array<any> = trips;

  constructor(private tripDataService: TripDataService, private router: Router) {}

  ngOnInit(): void {
    this.getTrips();
  }

  trips: Trip[] = []; // needs to be initialized
  message: string | undefined; // needs to be initialized

  // THIS WAY IS DEPRECATED AND WON'T WORK WITH HOW I SET UP HTTPCLIENT
  // private getTrips(): void {
  //   console.log('Inside TripListingComponent#getTrips');
  //   this.message = 'Searching for trips';
  //   this.tripDataService.getTrips().then((foundTrips: string | any[]) => {
  //     this.message = foundTrips.length > 0 ? '' : 'No trips found';
  //     this.trips = foundTrips;
  //   });
  // }

  private getTrips(): void {
    console.log('Inside TripListingComponent#getTrips');
    this.message = 'Searching for trips';
    this.tripDataService.getTrips().subscribe({
      next: (foundTrips: Trip[]) => {
        this.message = foundTrips.length > 0 ? '' : 'No trips found';
        this.trips = foundTrips;
      },
      error: (error: any) => {
        console.error('Error occurred while fetching trips:', error);
        this.message = 'An error occurred while fetching trips. Please try again.';
      }
    });
  }

  addTrip() {
    this.router.navigate(['add-trip']);
  }
}
