import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach } from 'vitest';
import { Header } from './header';
import { LayoutService } from '../../core/layout-service';

describe('HeaderComponent', () => {
  let component: Header;
  let fixture: ComponentFixture<Header>;
  let element: HTMLElement;
  let layout: LayoutService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Header],
    }).compileComponents();

    fixture = TestBed.createComponent(Header);
    component = fixture.componentInstance;
    element = fixture.nativeElement as HTMLElement;
    layout = TestBed.inject(LayoutService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('rendering', () => {
    it('should render the app title', () => {
      expect(element.textContent).toContain('Modern Angular');
    });

    it('should render the hamburger menu button', () => {
      const menuButton = element.querySelector('button[title="Toggle sidebar"]');
      expect(menuButton).toBeTruthy();
    });

    it('should render the dark mode toggle button', () => {
      const darkButton = element.querySelector('button[title="Toggle dark mode"]');
      expect(darkButton).toBeTruthy();
    });

    it('should render the account button', () => {
      const accountButton = element.querySelector('button[title="Account"]');
      expect(accountButton).toBeTruthy();
    });
  });

  describe('sidebar toggle', () => {
    it('should toggle sidebar when hamburger is clicked', () => {
      const initialState = layout.sidebarOpen();
      const menuButton = element.querySelector(
        'button[title="Toggle sidebar"]',
      ) as HTMLButtonElement;

      menuButton.click();
      fixture.detectChanges();

      expect(layout.sidebarOpen()).toBe(!initialState);
    });

    it('should toggle sidebar back on second click', () => {
      const initialState = layout.sidebarOpen();
      const menuButton = element.querySelector(
        'button[title="Toggle sidebar"]',
      ) as HTMLButtonElement;

      menuButton.click();
      menuButton.click();
      fixture.detectChanges();

      expect(layout.sidebarOpen()).toBe(initialState);
    });
  });

  describe('dark mode toggle', () => {
    it('should toggle dark mode when button is clicked', () => {
      const initialState = layout.darkMode();
      const darkButton = element.querySelector(
        'button[title="Toggle dark mode"]',
      ) as HTMLButtonElement;

      darkButton.click();
      fixture.detectChanges();

      expect(layout.darkMode()).toBe(!initialState);
    });

    it('should display moon icon when in light mode', () => {
      // Force light mode
      if (layout.darkMode()) layout.toggleDarkMode();
      fixture.detectChanges();

      const darkButton = element.querySelector('button[title="Toggle dark mode"]');
      expect(darkButton?.textContent?.trim()).toBe('dark_mode');
    });

    it('should display sun icon when in dark mode', () => {
      // Force dark mode
      if (!layout.darkMode()) layout.toggleDarkMode();
      fixture.detectChanges();

      const darkButton = element.querySelector('button[title="Toggle dark mode"]');
      expect(darkButton?.textContent?.trim()).toBe('light_mode');
    });

    it('should add dark class to documentElement when toggled on', () => {
      if (layout.darkMode()) layout.toggleDarkMode();
      fixture.detectChanges();
      expect(document.documentElement.classList.contains('dark')).toBe(false);

      layout.toggleDarkMode();
      fixture.detectChanges();
      expect(document.documentElement.classList.contains('dark')).toBe(true);
    });

    it('should remove dark class from documentElement when toggled off', () => {
      if (!layout.darkMode()) layout.toggleDarkMode();
      fixture.detectChanges();
      expect(document.documentElement.classList.contains('dark')).toBe(true);

      layout.toggleDarkMode();
      fixture.detectChanges();
      expect(document.documentElement.classList.contains('dark')).toBe(false);
    });
  });
});
