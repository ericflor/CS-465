import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'services/authentication.service';
import { User } from 'models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  public formError: string = '';

  public newUser: User = {
    name: '',
    email: '',
    password: ''
  };

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {}

  public onRegisterSubmit(): void {
    this.formError = '';
    if (!this.newUser.name || !this.newUser.email || !this.newUser.password) {
      this.formError = 'All fields are required, please try again';
    } else {
      this.doRegister();
    }
  }

  private doRegister(): void {
    this.authenticationService
      .register(this.newUser)
      .then(() => this.router.navigateByUrl('/list-trips'))  // Redirect to trips component
      .catch((message: string) => (this.formError = message));
  }
}
