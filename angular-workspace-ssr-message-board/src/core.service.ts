import { Inject, Injectable, LOCALE_ID } from '@angular/core';
const MOCK_USERNAME = 'Guest';

@Injectable({
  providedIn: 'root',
})
export class CoreService {
  constructor(@Inject(LOCALE_ID) public currentLocale: string) {}
  public usernameInputBinding: string = '';
  public savedUsername: string = MOCK_USERNAME;
  public saveUsername() {
    this.savedUsername = this.usernameInputBinding;
  }
}
