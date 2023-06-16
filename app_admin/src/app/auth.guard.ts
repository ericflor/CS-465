import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    if (location.hostname !== 'localhost' || location.port !== '4200') {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
