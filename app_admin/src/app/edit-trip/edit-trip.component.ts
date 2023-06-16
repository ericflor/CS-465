import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TripDataService } from 'services/trip-data.service';

@Component({
  selector: 'app-edit-trip',
  templateUrl: './edit-trip.component.html',
  styleUrls: ['./edit-trip.component.css'],
})

export class EditTripComponent implements OnInit {
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private tripService: TripDataService
  ) {}

  editForm!: FormGroup;
  submitted = false;

  ngOnInit() {
    // retrieve stashed tripId
    let tripCode = localStorage.getItem('tripCode');
    if (!tripCode) {
      alert("Something wrong, couldn't find where I stashed tripCode!");
      this.router.navigate(['']);
      return;
    }
    console.log('EditTripComponent#onInit found tripCode ' + tripCode);
    // initialize form
    this.editForm = this.formBuilder.group({
      _id: [],
      code: [tripCode, Validators.required],
      name: ['', Validators.required],
      length: ['', Validators.required],
      start: ['', Validators.required],
      resort: ['', Validators.required],
      perPerson: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required],
    });
    console.log(
      "EditTripComponent#onInit calling TripDataService#getTrip('" +
        tripCode +
        "')"
    );

      // SAME THING HERE, PROVIDED INSTRUCTIONS DON'T WORK WITH MODERN IMPLEMENATION OF HTTP CLIENT

    // this.tripService.getTrip(tripCode).then((data:any) => {
    //   console.log(data);
    //   // Don't use editForm.setValue() as it will throw console error
    //   this.editForm.patchValue(data[0]);
    // });

    this.tripService.getTrip(tripCode).subscribe((data: any) => {
      console.log(data);
      // Don't use editForm.setValue() as it will throw console error
      this.editForm.patchValue(data[0]);
    });
  }

  // onSubmit() { // SAME THING HERE, ALL DEPRECATED
  //   this.submitted = true;
  //   if (this.editForm.valid) {
  //     this.tripService.updateTrip(this.editForm.value).then((data:any) => {
  //       console.log(data);
  //       this.router.navigate(['']);
  //     });
  //   }
  // }

  onSubmit() {
    this.submitted = true;
    if (this.editForm.valid) {
      this.tripService.updateTrip(this.editForm.value).subscribe((data: any) => {
        console.log(data);
        this.router.navigate(['list-trips']);
      });
    }
  }

  // get the form short name to access the form fields
  get f() {
    return this.editForm.controls;
  }
}
