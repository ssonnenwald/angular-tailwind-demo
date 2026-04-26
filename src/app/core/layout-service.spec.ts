import { TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { LayoutService } from './layout-service';

describe('LayoutService', () => {
  let service: LayoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LayoutService);
  });

  afterEach(() => {
    // Clean up the dark class from documentElement after each test
    document.documentElement.classList.remove('dark');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('sidebar state', () => {
    it('should default to closed', () => {
      expect(service.sidebarOpen()).toBe(false);
    });

    it('should toggle open when toggleSidebar is called', () => {
      service.toggleSidebar();
      expect(service.sidebarOpen()).toBe(true);
    });

    it('should toggle closed on second call', () => {
      service.toggleSidebar();
      service.toggleSidebar();
      expect(service.sidebarOpen()).toBe(false);
    });
  });

  describe('dark mode state', () => {
    it('should default to false (light mode)', () => {
      expect(service.darkMode()).toBe(false);
    });

    it('should toggle to true when toggleDarkMode is called', () => {
      service.toggleDarkMode();
      expect(service.darkMode()).toBe(true);
    });

    it('should toggle back to false on second call', () => {
      service.toggleDarkMode();
      service.toggleDarkMode();
      expect(service.darkMode()).toBe(false);
    });

    it('should add dark class to documentElement when enabled', () => {
      service.toggleDarkMode();
      // Effects run on next microtask; flush by reading the signal
      TestBed.flushEffects();
      expect(document.documentElement.classList.contains('dark')).toBe(true);
    });

    it('should remove dark class from documentElement when disabled', () => {
      service.toggleDarkMode();
      TestBed.flushEffects();
      expect(document.documentElement.classList.contains('dark')).toBe(true);

      service.toggleDarkMode();
      TestBed.flushEffects();
      expect(document.documentElement.classList.contains('dark')).toBe(false);
    });
  });

  describe('signals are independent', () => {
    it('should not affect dark mode when toggling sidebar', () => {
      const initialDark = service.darkMode();
      service.toggleSidebar();
      expect(service.darkMode()).toBe(initialDark);
    });

    it('should not affect sidebar when toggling dark mode', () => {
      const initialSidebar = service.sidebarOpen();
      service.toggleDarkMode();
      expect(service.sidebarOpen()).toBe(initialSidebar);
    });
  });
});
