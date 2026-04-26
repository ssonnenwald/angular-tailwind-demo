import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach } from 'vitest';
import { Settings } from './settings';

describe('SettingsComponent', () => {
  let component: Settings;
  let fixture: ComponentFixture<Settings>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Settings],
    }).compileComponents();

    fixture = TestBed.createComponent(Settings);
    component = fixture.componentInstance;
    element = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('page header', () => {
    it('should render the settings title', () => {
      const heading = element.querySelector('h1');
      expect(heading?.textContent).toContain('Settings');
    });

    it('should render the page subtitle', () => {
      expect(element.textContent).toContain('Manage your account preferences');
    });
  });

  describe('profile section', () => {
    it('should render the profile section heading', () => {
      const headings = element.querySelectorAll('h2');
      const profileHeading = Array.from(headings).find((h) => h.textContent?.includes('Profile'));
      expect(profileHeading).toBeTruthy();
    });

    it('should render avatar with initials', () => {
      expect(element.textContent).toContain('JD');
    });

    it('should render avatar action buttons', () => {
      const buttons = Array.from(element.querySelectorAll('button'));
      expect(buttons.some((b) => b.textContent?.includes('Upload new'))).toBe(true);
      expect(buttons.some((b) => b.textContent?.includes('Remove'))).toBe(true);
    });

    it('should render first name input pre-filled', () => {
      const inputs = element.querySelectorAll('input[type="text"]');
      const firstNameInput = inputs[0] as HTMLInputElement;
      expect(firstNameInput.value).toBe('Jane');
    });

    it('should render last name input pre-filled', () => {
      const inputs = element.querySelectorAll('input[type="text"]');
      const lastNameInput = inputs[1] as HTMLInputElement;
      expect(lastNameInput.value).toBe('Doe');
    });

    it('should render email input pre-filled', () => {
      const emailInput = element.querySelector('input[type="email"]') as HTMLInputElement;
      expect(emailInput.value).toBe('jane.doe@example.com');
    });

    it('should render bio textarea pre-filled', () => {
      const textarea = element.querySelector('textarea') as HTMLTextAreaElement;
      expect(textarea.value).toContain('Frontend engineer');
    });

    it('should update profile model when first name input changes', () => {
      const inputs = element.querySelectorAll('input[type="text"]');
      const firstNameInput = inputs[0] as HTMLInputElement;
      firstNameInput.value = 'John';
      firstNameInput.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      expect((component as any).profile.firstName).toBe('John');
    });
  });

  describe('notifications section', () => {
    it('should render the notifications section heading', () => {
      const headings = element.querySelectorAll('h2');
      const notifHeading = Array.from(headings).find((h) =>
        h.textContent?.includes('Notifications'),
      );
      expect(notifHeading).toBeTruthy();
    });

    it('should render all 4 notification toggles', () => {
      const text = element.textContent ?? '';
      expect(text).toContain('Email notifications');
      expect(text).toContain('Push notifications');
      expect(text).toContain('Marketing emails');
      expect(text).toContain('Mentions and replies');
    });

    it('should toggle notification state when clicked', () => {
      const initialState = (component as any)
        .notifications()
        .find((n: any) => n.key === 'email').enabled;

      // Find the toggle button for email notifications by walking up from the label
      const labels = Array.from(element.querySelectorAll('.font-medium'));
      const emailLabel = labels.find((l) => l.textContent?.trim() === 'Email notifications');
      const row = emailLabel?.closest('.flex');
      const toggleButton = row?.querySelector('button') as HTMLButtonElement;

      toggleButton.click();
      fixture.detectChanges();

      const newState = (component as any)
        .notifications()
        .find((n: any) => n.key === 'email').enabled;
      expect(newState).toBe(!initialState);
    });

    it('should reflect enabled state in toggle styling', () => {
      const enabledToggles = element.querySelectorAll('button.bg-indigo-600');
      const enabledNotifications = (component as any).notifications().filter((n: any) => n.enabled);
      // Each enabled notification has a toggle with bg-indigo-600 (plus there may be
      // other indigo buttons elsewhere, so check >=)
      expect(enabledToggles.length).toBeGreaterThanOrEqual(enabledNotifications.length);
    });
  });

  describe('appearance section', () => {
    it('should render the appearance section heading', () => {
      const headings = element.querySelectorAll('h2');
      const appearanceHeading = Array.from(headings).find((h) =>
        h.textContent?.includes('Appearance'),
      );
      expect(appearanceHeading).toBeTruthy();
    });

    it('should render all three theme options', () => {
      const text = element.textContent ?? '';
      expect(text).toContain('Light');
      expect(text).toContain('Dark');
      expect(text).toContain('System');
    });

    it('should default to system theme', () => {
      expect((component as any).selectedTheme()).toBe('system');
    });

    it('should change selected theme when clicked', () => {
      const buttons = Array.from(element.querySelectorAll('button'));
      const lightButton = buttons.find((b) => b.textContent?.trim().includes('Light'));
      lightButton?.click();
      fixture.detectChanges();

      expect((component as any).selectedTheme()).toBe('light');
    });

    it('should highlight the selected theme button', () => {
      const buttons = Array.from(element.querySelectorAll('button'));
      const darkButton = buttons.find((b) => b.textContent?.trim().includes('Dark'));
      darkButton?.click();
      fixture.detectChanges();

      // After clicking Dark, that button should have the indigo border class
      const refreshed = Array.from(element.querySelectorAll('button')).find((b) =>
        b.textContent?.trim().includes('Dark'),
      );
      expect(refreshed?.className).toContain('border-indigo-600');
    });
  });

  describe('danger zone', () => {
    it('should render the danger zone section', () => {
      const headings = element.querySelectorAll('h2');
      const dangerHeading = Array.from(headings).find((h) =>
        h.textContent?.includes('Danger zone'),
      );
      expect(dangerHeading).toBeTruthy();
    });

    it('should render the delete account button', () => {
      const buttons = Array.from(element.querySelectorAll('button'));
      const deleteButton = buttons.find((b) => b.textContent?.includes('Delete account'));
      expect(deleteButton).toBeTruthy();
      expect(deleteButton?.className).toContain('bg-red-600');
    });
  });

  describe('save bar', () => {
    it('should render Cancel and Save changes buttons', () => {
      const buttons = Array.from(element.querySelectorAll('button'));
      expect(buttons.some((b) => b.textContent?.trim() === 'Cancel')).toBe(true);
      expect(buttons.some((b) => b.textContent?.includes('Save changes'))).toBe(true);
    });
  });
});
