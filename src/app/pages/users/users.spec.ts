import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach } from 'vitest';
import { Users } from './users';

describe('UsersComponent', () => {
  let component: Users;
  let fixture: ComponentFixture<Users>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Users],
    }).compileComponents();

    fixture = TestBed.createComponent(Users);
    component = fixture.componentInstance;
    element = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('page header', () => {
    it('should render the users title', () => {
      const heading = element.querySelector('h1');
      expect(heading?.textContent).toContain('Users');
    });

    it('should render the invite user button', () => {
      const button = Array.from(element.querySelectorAll('button')).find((b) =>
        b.textContent?.includes('Invite user'),
      );
      expect(button).toBeTruthy();
    });
  });

  describe('initial state', () => {
    it('should default to table view', () => {
      const table = element.querySelector('table');
      expect(table).toBeTruthy();
    });

    it('should render all 8 users in table view', () => {
      const tableRows = element.querySelectorAll('tbody tr');
      expect(tableRows.length).toBe(8);
    });

    it('should render the search input with empty value', () => {
      const input = element.querySelector('input[type="text"]') as HTMLInputElement;
      expect(input).toBeTruthy();
      expect(input.value).toBe('');
    });
  });

  describe('search filtering', () => {
    it('should filter users by name', async () => {
      const input = element.querySelector('input[type="text"]') as HTMLInputElement;
      input.value = 'Sarah';
      input.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      const tableRows = element.querySelectorAll('tbody tr');
      expect(tableRows.length).toBe(1);
      expect(element.textContent).toContain('Sarah Chen');
    });

    it('should filter users by email', () => {
      const input = element.querySelector('input[type="text"]') as HTMLInputElement;
      input.value = 'aisha.p@example.com';
      input.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      const tableRows = element.querySelectorAll('tbody tr');
      expect(tableRows.length).toBe(1);
      expect(element.textContent).toContain('Aisha Patel');
    });

    it('should be case-insensitive', () => {
      const input = element.querySelector('input[type="text"]') as HTMLInputElement;
      input.value = 'SARAH';
      input.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      const tableRows = element.querySelectorAll('tbody tr');
      expect(tableRows.length).toBe(1);
    });

    it('should trim whitespace when searching', () => {
      const input = element.querySelector('input[type="text"]') as HTMLInputElement;
      input.value = '   Sarah   ';
      input.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      const tableRows = element.querySelectorAll('tbody tr');
      expect(tableRows.length).toBe(1);
    });

    it('should show empty state when no users match', () => {
      const input = element.querySelector('input[type="text"]') as HTMLInputElement;
      input.value = 'NonExistentUser';
      input.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      expect(element.textContent).toContain('No users match your search');
      const tableRows = element.querySelectorAll('tbody tr');
      expect(tableRows.length).toBe(0);
    });

    it('should restore all users when search is cleared', () => {
      const input = element.querySelector('input[type="text"]') as HTMLInputElement;
      input.value = 'Sarah';
      input.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      expect(element.querySelectorAll('tbody tr').length).toBe(1);

      input.value = '';
      input.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      expect(element.querySelectorAll('tbody tr').length).toBe(8);
    });
  });

  describe('view toggle', () => {
    it('should switch from table to grid view', () => {
      const buttons = Array.from(element.querySelectorAll('button'));
      const gridButton = buttons.find((b) => b.textContent?.trim().includes('Grid'));
      gridButton?.click();
      fixture.detectChanges();

      expect(element.querySelector('table')).toBeFalsy();
      const cards = element.querySelectorAll('.grid > div');
      expect(cards.length).toBeGreaterThan(0);
    });

    it('should switch back from grid to table view', () => {
      const buttons = Array.from(element.querySelectorAll('button'));

      buttons.find((b) => b.textContent?.trim().includes('Grid'))?.click();
      fixture.detectChanges();
      expect(element.querySelector('table')).toBeFalsy();

      const refreshedButtons = Array.from(element.querySelectorAll('button'));
      refreshedButtons.find((b) => b.textContent?.trim().includes('Table'))?.click();
      fixture.detectChanges();
      expect(element.querySelector('table')).toBeTruthy();
    });

    it('should render all 8 users as cards in grid view', () => {
      const buttons = Array.from(element.querySelectorAll('button'));
      buttons.find((b) => b.textContent?.trim().includes('Grid'))?.click();
      fixture.detectChanges();

      const viewProfileButtons = Array.from(element.querySelectorAll('button')).filter((b) =>
        b.textContent?.includes('View profile'),
      );
      expect(viewProfileButtons.length).toBe(8);
    });

    it('should preserve search filter when switching views', () => {
      const input = element.querySelector('input[type="text"]') as HTMLInputElement;
      input.value = 'Sarah';
      input.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      const buttons = Array.from(element.querySelectorAll('button'));
      buttons.find((b) => b.textContent?.trim().includes('Grid'))?.click();
      fixture.detectChanges();

      const viewProfileButtons = Array.from(element.querySelectorAll('button')).filter((b) =>
        b.textContent?.includes('View profile'),
      );
      expect(viewProfileButtons.length).toBe(1);
      expect(element.textContent).toContain('Sarah Chen');
    });
  });

  describe('user data rendering', () => {
    it('should render user names and emails in the table', () => {
      const text = element.textContent ?? '';
      expect(text).toContain('Sarah Chen');
      expect(text).toContain('sarah.chen@example.com');
      expect(text).toContain('Mike Torres');
      expect(text).toContain('mike.t@example.com');
    });

    it('should render status badges', () => {
      const text = element.textContent ?? '';
      expect(text).toContain('Active');
      expect(text).toContain('Inactive');
      expect(text).toContain('Pending');
    });

    it('should render user roles', () => {
      const text = element.textContent ?? '';
      expect(text).toContain('Admin');
      expect(text).toContain('Editor');
      expect(text).toContain('Viewer');
    });

    it('should render last seen timestamps', () => {
      const text = element.textContent ?? '';
      expect(text).toContain('2 min ago');
      expect(text).toContain('Never');
    });
  });
});
