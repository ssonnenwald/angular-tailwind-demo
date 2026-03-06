import { Injectable, signal, computed, effect } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LayoutState {
  private sidebarOpenSignal = signal(localStorage.getItem('sidebar') !== 'closed');

  private darkModeSignal = signal(localStorage.getItem('theme') === 'dark');

  sidebarOpen = computed(() => this.sidebarOpenSignal());
  darkMode = computed(() => this.darkModeSignal());

  constructor() {
    // apply theme immediately
    this.applyTheme(this.darkModeSignal());

    effect(() => {
      localStorage.setItem('sidebar', this.sidebarOpen() ? 'open' : 'closed');
    });

    effect(() => {
      const dark = this.darkMode();
      this.applyTheme(dark);
      localStorage.setItem('theme', dark ? 'dark' : 'light');
    });
  }

  toggleSidebar() {
    this.sidebarOpenSignal.update((v) => !v);
  }

  toggleDarkMode() {
    this.darkModeSignal.update((v) => !v);
  }

  private applyTheme(dark: boolean) {
    const root = document.documentElement;

    if (dark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }
}
