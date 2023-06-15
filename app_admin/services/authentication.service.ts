import { Inject, Injectable } from '@angular/core';
import { BROWSER_STORAGE } from '../src/app/storage';
import { User } from '../models/user';
import { AuthResponse } from '../models/authresponse';
import { TripDataService } from '../services/trip-data.service';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

  constructor(
    @Inject(BROWSER_STORAGE) private storage: Storage,
    private tripDataService: TripDataService
  ) {}

  public getToken(): string {
    return this.storage.getItem('travlr-token')!;
  }

  public saveToken(token: string): void {
    this.storage.setItem('travlr-token', token);
  }

  public async login(user: User): Promise<any> {
    try {
      const authResp: AuthResponse | undefined = await this.tripDataService.login(user).toPromise();
      if (authResp && authResp.token) {
        this.saveToken(authResp.token);
      } else {
        throw new Error('Login failed: Invalid response or missing token');
      }
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  }

  public async register(user: User): Promise<any> {
    try {
      const authResp: AuthResponse | undefined = await this.tripDataService.register(user).toPromise();
      if (authResp && authResp.token) {
        this.saveToken(authResp.token);
      } else {
        throw new Error('Registration failed: Invalid response or missing token');
      }
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  }

  public logout(): void {
    this.storage.removeItem('travlr-token');
  }

  public isLoggedIn(): boolean {
    const token: string = this.getToken();
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  public getCurrentUser(): User | null {
    if (this.isLoggedIn()) {
      const token: string = this.getToken();
      const { email, name } = JSON.parse(atob(token.split('.')[1]));
      return { email, name } as User;
    }
    return null; // Return null when the user is not logged in
  }

}
