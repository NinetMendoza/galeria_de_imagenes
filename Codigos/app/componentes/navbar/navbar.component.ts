import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {
  private themeKey = 'app-theme';
  isSynth = false;

  ngOnInit(): void {
    try {
      const saved = localStorage.getItem(this.themeKey);
      let theme = saved ?? document.documentElement.getAttribute('data-theme') ?? 'dark';
      if (!saved && typeof window !== 'undefined' && window.matchMedia) {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
          theme = 'dark';
        } else {
          theme = 'light';
        }
      }
      document.documentElement.setAttribute('data-theme', theme);
      this.isSynth = theme === 'synthwave';
    } catch (e) {
      // ignore in non-browser environments
    }
  }

  onThemeToggle(event: Event) {
    const input = event.target as HTMLInputElement;
    const theme = input.checked ? input.value : 'dark';
    try {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem(this.themeKey, theme);
      this.isSynth = theme === 'synthwave';
    } catch (e) {
      // ignore in non-browser environments
    }
  }
}
