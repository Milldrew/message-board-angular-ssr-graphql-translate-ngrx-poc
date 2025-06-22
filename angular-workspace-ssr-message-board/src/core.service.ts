import { Injectable } from '@angular/core';
const MOCK_USERNAME = 'Guest';

@Injectable({
  providedIn: 'root',
})
export class CoreService {
  public usernameInputBinding: string = '';
  public savedUsername: string = MOCK_USERNAME;
  public saveUsername() {
    this.savedUsername = this.usernameInputBinding;
  }
}
