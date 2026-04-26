import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Component } from '@angular/core';
import { describe, it, expect, beforeEach } from 'vitest';
import { Sidebar } from './sidebar';
import { LayoutService } from '../../core/layout-service';

@Component({ standalone: true, template: '' })
class StubComponent {}

describe('SidebarComponent', () => {
  let component: Sidebar;
  let fixture: ComponentFixture<Sidebar>;
  let element: HTMLElement;
  let layout: LayoutService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sidebar],
      providers: [
        provideRouter([
          { path: 'dashboard', component: StubComponent },
          { path: 'users', component: StubComponent },
          { path: 'settings', component: StubComponent },
          { path: 'styleguide', component: StubComponent },
        ]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Sidebar);
    component = fixture.componentInstance;
    element = fixture.nativeElement as HTMLElement;
    layout = TestBed.inject(LayoutService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('navigation items', () => {
    it('should render exactly four navigation links', () => {
      const links = element.querySelectorAll('a');
      expect(links.length).toBe(4);
    });

    it('should render correct routes for each link', () => {
      const links = Array.from(element.querySelectorAll('a'));
      const hrefs = links.map((a) => a.getAttribute('href'));
      expect(hrefs).toContain('/dashboard');
      expect(hrefs).toContain('/users');
      expect(hrefs).toContain('/settings');
      expect(hrefs).toContain('/styleguide');
    });

    it('should render Material icons for each nav item', () => {
      const icons = element.querySelectorAll('mat-icon');
      expect(icons.length).toBe(4);
    });

    it('should render the expected icon names', () => {
      const icons = Array.from(element.querySelectorAll('mat-icon'));
      const iconNames = icons.map((i) => i.textContent?.trim());
      expect(iconNames).toContain('dashboard');
      expect(iconNames).toContain('group');
      expect(iconNames).toContain('settings');
      expect(iconNames).toContain('palette');
    });

    it('should set title attribute on each link for collapsed-state tooltips', () => {
      const links = Array.from(element.querySelectorAll('a'));
      const titles = links.map((a) => a.getAttribute('title'));
      expect(titles).toContain('Dashboard');
      expect(titles).toContain('Users');
      expect(titles).toContain('Settings');
      expect(titles).toContain('Style guide');
    });
  });

  describe('collapsed state (default)', () => {
    beforeEach(() => {
      // Ensure sidebar starts closed
      if (layout.sidebarOpen()) layout.toggleSidebar();
      fixture.detectChanges();
    });

    it('should apply w-16 to the aside', () => {
      const aside = element.querySelector('aside');
      expect(aside?.className).toContain('w-16');
      expect(aside?.className).not.toContain('w-64');
    });

    it('should hide labels when collapsed', () => {
      const labels = element.querySelectorAll('a span');
      expect(labels.length).toBe(0);
    });

    it('should center icons when collapsed', () => {
      const links = Array.from(element.querySelectorAll('a'));
      links.forEach((link) => {
        expect(link.className).toContain('justify-center');
      });
    });
  });

  describe('expanded state', () => {
    beforeEach(() => {
      // Ensure sidebar is open
      if (!layout.sidebarOpen()) layout.toggleSidebar();
      fixture.detectChanges();
    });

    it('should apply w-64 to the aside', () => {
      const aside = element.querySelector('aside');
      expect(aside?.className).toContain('w-64');
      expect(aside?.className).not.toContain('w-16');
    });

    it('should show all four labels when expanded', () => {
      const labels = element.querySelectorAll('a span');
      expect(labels.length).toBe(4);
    });

    it('should render label text', () => {
      const text = element.textContent ?? '';
      expect(text).toContain('Dashboard');
      expect(text).toContain('Users');
      expect(text).toContain('Settings');
      expect(text).toContain('Style guide');
    });

    it('should not center icons when expanded (they sit left with labels)', () => {
      const links = Array.from(element.querySelectorAll('a'));
      links.forEach((link) => {
        expect(link.className).not.toContain('justify-center');
        expect(link.className).toContain('gap-4');
        expect(link.className).toContain('px-3');
      });
    });
  });

  describe('reactivity to layout service', () => {
    it('should re-render when sidebar state changes', () => {
      // Start collapsed
      if (layout.sidebarOpen()) layout.toggleSidebar();
      fixture.detectChanges();
      expect(element.querySelectorAll('a span').length).toBe(0);

      // Open it
      layout.toggleSidebar();
      fixture.detectChanges();
      expect(element.querySelectorAll('a span').length).toBe(4);

      // Close it again
      layout.toggleSidebar();
      fixture.detectChanges();
      expect(element.querySelectorAll('a span').length).toBe(0);
    });

    it('should toggle aside width when sidebar state changes', () => {
      if (layout.sidebarOpen()) layout.toggleSidebar();
      fixture.detectChanges();

      const aside = element.querySelector('aside');
      expect(aside?.className).toContain('w-16');

      layout.toggleSidebar();
      fixture.detectChanges();
      expect(aside?.className).toContain('w-64');
    });
  });
});
