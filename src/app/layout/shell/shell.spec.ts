import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Component } from '@angular/core';
import { describe, it, expect, beforeEach } from 'vitest';
import { Shell } from './shell';

@Component({ standalone: true, template: '<p>stub route</p>' })
class StubComponent {}

describe('ShellComponent', () => {
  let component: Shell;
  let fixture: ComponentFixture<Shell>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Shell],
      providers: [
        provideRouter([
          { path: 'dashboard', component: StubComponent },
          { path: 'users', component: StubComponent },
          { path: 'settings', component: StubComponent },
          { path: 'styleguide', component: StubComponent },
        ]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Shell);
    component = fixture.componentInstance;
    element = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('layout structure', () => {
    it('should render the header', () => {
      const header = element.querySelector('app-header');
      expect(header).toBeTruthy();
    });

    it('should render the sidebar', () => {
      const sidebar = element.querySelector('app-sidebar');
      expect(sidebar).toBeTruthy();
    });

    it('should render the main content area', () => {
      const main = element.querySelector('main');
      expect(main).toBeTruthy();
    });

    it('should render the router outlet for child routes', () => {
      const outlet = element.querySelector('router-outlet');
      expect(outlet).toBeTruthy();
    });
  });

  describe('layout classes', () => {
    it('should have a full-height outer wrapper', () => {
      // The outer div should use h-screen (or similar) to fill viewport
      const outer = element.firstElementChild as HTMLElement;
      expect(outer?.className).toMatch(/h-(screen|full)/);
    });

    it('should make main content scrollable', () => {
      const main = element.querySelector('main');
      expect(main?.className).toContain('overflow-auto');
    });

    it('should set min-h-0 on main to enable flex scrolling', () => {
      const main = element.querySelector('main');
      // min-h-0 is required for overflow-auto to actually trigger inside flex
      expect(main?.className).toContain('min-h-0');
    });

    it('should give main flex-1 so it fills remaining width', () => {
      const main = element.querySelector('main');
      expect(main?.className).toContain('flex-1');
    });
  });

  describe('card container', () => {
    it('should apply rounded corners to the card', () => {
      const card = element.querySelector('[class*="rounded-xl"]');
      expect(card).toBeTruthy();
    });

    it('should apply overflow-hidden to clip children at corners', () => {
      // Find the card with both rounded-xl and overflow-hidden
      const cards = element.querySelectorAll('[class*="rounded-xl"]');
      const cardWithOverflow = Array.from(cards).find((c) =>
        c.className.includes('overflow-hidden'),
      );
      expect(cardWithOverflow).toBeTruthy();
    });
  });
});
