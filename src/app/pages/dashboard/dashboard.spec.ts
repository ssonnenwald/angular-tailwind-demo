import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach } from 'vitest';
import { Dashboard } from './dashboard';

describe('DashboardComponent', () => {
  let component: Dashboard;
  let fixture: ComponentFixture<Dashboard>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Dashboard],
    }).compileComponents();

    fixture = TestBed.createComponent(Dashboard);
    component = fixture.componentInstance;
    element = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('page header', () => {
    it('should render the dashboard title', () => {
      const heading = element.querySelector('h1');
      expect(heading?.textContent).toContain('Dashboard');
    });

    it('should render a welcome subtitle', () => {
      expect(element.textContent).toContain('Welcome back');
    });

    it('should render the new report button', () => {
      const button = Array.from(element.querySelectorAll('button')).find((b) =>
        b.textContent?.includes('New report'),
      );
      expect(button).toBeTruthy();
    });
  });

  describe('stats grid', () => {
    it('should render exactly four stat cards', () => {
      const statLabels = element.querySelectorAll('.grid > div p.text-sm.font-medium');
      expect(statLabels.length).toBeGreaterThanOrEqual(4);
    });

    it('should render all expected stat labels', () => {
      const text = element.textContent ?? '';
      expect(text).toContain('Total revenue');
      expect(text).toContain('Active users');
      expect(text).toContain('New orders');
      expect(text).toContain('Conversion');
    });

    it('should render stat values', () => {
      const text = element.textContent ?? '';
      expect(text).toContain('$48,294');
      expect(text).toContain('2,841');
      expect(text).toContain('184');
      expect(text).toContain('3.42%');
    });

    it('should render trending indicators with change percentages', () => {
      const text = element.textContent ?? '';
      expect(text).toContain('+12.5%');
      expect(text).toContain('+8.2%');
      expect(text).toContain('-3.1%');
      expect(text).toContain('+1.8%');
    });

    it('should mark trending up stats with green text', () => {
      const greenChanges = element.querySelectorAll('.text-green-600');
      expect(greenChanges.length).toBeGreaterThan(0);
    });

    it('should mark trending down stats with red text', () => {
      const redChanges = element.querySelectorAll('.text-red-600');
      expect(redChanges.length).toBeGreaterThan(0);
    });
  });

  describe('revenue chart', () => {
    it('should render the revenue section heading', () => {
      const headings = element.querySelectorAll('h2');
      const revenueHeading = Array.from(headings).find((h) => h.textContent?.includes('Revenue'));
      expect(revenueHeading).toBeTruthy();
    });

    it('should render the time range selector with Week, Month, Year', () => {
      const text = element.textContent ?? '';
      expect(text).toContain('Week');
      expect(text).toContain('Month');
      expect(text).toContain('Year');
    });

    it('should render seven chart bars (one per day)', () => {
      const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
      const text = element.textContent ?? '';
      dayLabels.forEach((day) => expect(text).toContain(day));
    });

    it('should set bar heights via inline styles', () => {
      const bars = element.querySelectorAll('[style*="height"]');
      expect(bars.length).toBeGreaterThanOrEqual(7);
    });
  });

  describe('activity feed', () => {
    it('should render the recent activity heading', () => {
      const headings = element.querySelectorAll('h2');
      const activityHeading = Array.from(headings).find((h) =>
        h.textContent?.includes('Recent activity'),
      );
      expect(activityHeading).toBeTruthy();
    });

    it('should render four activity items', () => {
      const text = element.textContent ?? '';
      expect(text).toContain('Sarah Chen');
      expect(text).toContain('Mike Torres');
      expect(text).toContain('Aisha Patel');
      expect(text).toContain('James Wilson');
    });

    it('should render initials avatars for each activity', () => {
      const text = element.textContent ?? '';
      expect(text).toContain('SC');
      expect(text).toContain('MT');
      expect(text).toContain('AP');
      expect(text).toContain('JW');
    });

    it('should render timestamps for activities', () => {
      const text = element.textContent ?? '';
      expect(text).toContain('2 minutes ago');
      expect(text).toContain('1 hour ago');
    });

    it('should render the view all activity button', () => {
      const button = Array.from(element.querySelectorAll('button')).find((b) =>
        b.textContent?.includes('View all activity'),
      );
      expect(button).toBeTruthy();
    });
  });
});
