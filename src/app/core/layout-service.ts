import { Injectable, signal, effect } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LayoutService {
  readonly sidebarOpen = signal(false);
  readonly darkMode = signal(false);

  constructor() {
    effect(() => {
      const isDark = this.darkMode();
      document.documentElement.classList.toggle('dark', isDark);
    });
  }

  toggleSidebar(): void {
    this.sidebarOpen.update((v) => !v);
  }

  toggleDarkMode(): void {
    this.darkMode.update((v) => !v);
  }
}
