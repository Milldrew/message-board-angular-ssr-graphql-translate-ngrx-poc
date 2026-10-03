import { Inject, Injectable, LOCALE_ID, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

const USERNAME_KEY = 'message-board.username';

@Injectable({
  providedIn: 'root',
})
export class CoreService {
  constructor(
    @Inject(LOCALE_ID) public currentLocale: string,
    @Inject(PLATFORM_ID) private platformId: object,
  ) {
    // Remembered in the browser: switching language is a full page load (a
    // separate build per locale), and used to ask for the name all over again.
    if (isPlatformBrowser(this.platformId)) {
      try {
        this.savedUsername = localStorage.getItem(USERNAME_KEY) ?? '';
      } catch {}
    }
  }
  public usernameInputBinding: string = '';
  public savedUsername: string = '';
  public saveUsername() {
    const name = this.usernameInputBinding.trim().slice(0, 24);
    if (!name) return;
    this.savedUsername = name;
    try {
      localStorage.setItem(USERNAME_KEY, name);
    } catch {}
  }
}
