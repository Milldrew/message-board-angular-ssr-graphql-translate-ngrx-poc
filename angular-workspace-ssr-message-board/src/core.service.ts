import { Inject, Injectable, LOCALE_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CoreService {
  constructor(@Inject(LOCALE_ID) public currentLocale: string) {}
  public usernameInputBinding: string = '';
  public savedUsername: string = '';
  public saveUsername() {
    this.savedUsername = this.usernameInputBinding;
  }
}
