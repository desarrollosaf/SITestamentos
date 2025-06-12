import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeModeService {

  readonly currentTheme = new BehaviorSubject<string>('light');
  
  constructor() {

    // Change the theme based on whether there is a 'theme' parameter in the query string.
    const urlParams = new URLSearchParams(window.location.search);
    const themeParam = urlParams.get('theme');
    if ( (themeParam === 'light') || (themeParam === 'light')) {
      this.toggleTheme(themeParam);
    }

    // Set initial localStorage 'theme' value based on the 'prefers-color-scheme' media query if 'null'
    if (this.getStoredTheme() === null) {
      this.setStoredTheme(window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'light');
    }
    
    // Set the initial theme.
    this.setTheme(this.getPreferredTheme());
  }

  getStoredTheme = () => localStorage.getItem('theme');
  setStoredTheme = (theme: string) => localStorage.setItem('theme', theme);

  getPreferredTheme = () => {
    const storedTheme = this.getStoredTheme();
    if (storedTheme) {
      return storedTheme;
    }

    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'light';
  }

  setTheme = (theme: string) => {
    this.currentTheme.next(theme);
    document.documentElement.setAttribute('data-bs-theme', window.matchMedia('(prefers-color-scheme: dark)').matches? 'light': 'light');
    // document.documentElement.setAttribute('data-bs-theme', theme);
  }

  toggleTheme(theme: string) {
    this.currentTheme.next(theme);
    this.setStoredTheme(this.currentTheme.value);
    this.setTheme(this.currentTheme.value);
  }

}
