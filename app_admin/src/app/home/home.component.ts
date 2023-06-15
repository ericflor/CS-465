import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'services/authentication.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  constructor(private auth: AuthenticationService) { }

  ngOnInit(): void {
  }

  public isLoggedIn(): boolean {
    return this.auth.isLoggedIn();
  }

}
