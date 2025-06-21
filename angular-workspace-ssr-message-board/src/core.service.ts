import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CoreService {
  public usernameInputBinding: string = '';
  public savedUsername: string = '';
  public saveUsername() {
    this.savedUsername = this.usernameInputBinding;
  }
}
