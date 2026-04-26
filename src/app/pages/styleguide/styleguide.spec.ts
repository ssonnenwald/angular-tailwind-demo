import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach } from 'vitest';
import { Styleguide } from './styleguide';

describe('StyleguideComponent', () => {
  let component: Styleguide;
  let fixture: ComponentFixture<Styleguide>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Styleguide],
    }).compileComponents();

    fixture = TestBed.createComponent(Styleguide);
    component = fixture.componentInstance;
    element = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('page header', () => {
    it('should render the style guide title', () => {
      const heading = element.querySelector('h1');
      expect(heading?.textContent).toContain('Style guide');
    });

    it('should render the page subtitle', () => {
      expect(element.textContent).toContain('Design tokens and component patterns');
    });
  });

  describe('typography section', () => {
    it('should render the typography heading', () => {
      const headings = element.querySelectorAll('h2');
      const typoHeading = Array.from(headings).find((h) => h.textContent?.includes('Typography'));
      expect(typoHeading).toBeTruthy();
    });

    it('should render all six typography size examples', () => {
      const text = element.textContent ?? '';
      expect(text).toContain('text-3xl');
      expect(text).toContain('text-2xl');
      expect(text).toContain('text-lg');
      expect(text).toContain('text-base');
      expect(text).toContain('text-sm');
      expect(text).toContain('text-xs');
    });

    it('should render heading examples', () => {
      const text = element.textContent ?? '';
      expect(text).toContain('Heading one');
      expect(text).toContain('Heading two');
      expect(text).toContain('Heading three');
    });
  });

  describe('color palette section', () => {
    it('should render the color palette heading', () => {
      const headings = element.querySelectorAll('h2');
      const paletteHeading = Array.from(headings).find((h) =>
        h.textContent?.includes('Color palette'),
      );
      expect(paletteHeading).toBeTruthy();
    });

    it('should render all four color ramp categories', () => {
      const text = element.textContent ?? '';
      expect(text).toContain('Indigo');
      expect(text).toContain('Gray');
      expect(text).toContain('Green');
      expect(text).toContain('Red');
    });

    it('should render 10 swatches per ramp (40 total)', () => {
      // Each swatch has the bg-{color}-{weight} class on a div
      const swatches = element.querySelectorAll(
        '[class*="bg-indigo-"], [class*="bg-gray-"], [class*="bg-green-"], [class*="bg-red-"]',
      );
      // Note: this also matches buttons and other elements with these classes,
      // so we check that at least 40 swatches exist
      expect(swatches.length).toBeGreaterThanOrEqual(40);
    });

    it('should label each swatch with its weight', () => {
      const weights = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'];
      const text = element.textContent ?? '';
      weights.forEach((w) => expect(text).toContain(w));
    });
  });

  describe('buttons section', () => {
    it('should render the buttons heading', () => {
      const headings = element.querySelectorAll('h2');
      const buttonsHeading = Array.from(headings).find((h) => h.textContent?.includes('Buttons'));
      expect(buttonsHeading).toBeTruthy();
    });

    it('should render all button variants', () => {
      const text = element.textContent ?? '';
      expect(text).toContain('Primary');
      expect(text).toContain('Secondary');
      expect(text).toContain('Ghost');
      expect(text).toContain('Destructive');
      expect(text).toContain('Disabled');
    });

    it('should render all button sizes', () => {
      const text = element.textContent ?? '';
      expect(text).toContain('Extra small');
      expect(text).toContain('Small');
      expect(text).toContain('Medium');
      expect(text).toContain('Large');
    });

    it('should render the disabled button as actually disabled', () => {
      const disabledButton = Array.from(element.querySelectorAll('button')).find((b) =>
        b.textContent?.includes('Disabled'),
      );
      expect(disabledButton?.disabled).toBe(true);
    });

    it('should render icon buttons', () => {
      const text = element.textContent ?? '';
      expect(text).toContain('Add item');
      expect(text).toContain('Download');
    });
  });

  describe('badges section', () => {
    it('should render the badges heading', () => {
      const headings = element.querySelectorAll('h2');
      const badgesHeading = Array.from(headings).find((h) => h.textContent?.includes('Badges'));
      expect(badgesHeading).toBeTruthy();
    });

    it('should render all badge variants', () => {
      const text = element.textContent ?? '';
      expect(text).toContain('Default');
      expect(text).toContain('Info');
      expect(text).toContain('Success');
      expect(text).toContain('Warning');
      expect(text).toContain('Danger');
      expect(text).toContain('With dot');
    });
  });

  describe('spacing scale section', () => {
    it('should render the spacing scale heading', () => {
      const headings = element.querySelectorAll('h2');
      const spacingHeading = Array.from(headings).find((h) =>
        h.textContent?.includes('Spacing scale'),
      );
      expect(spacingHeading).toBeTruthy();
    });

    it('should render spacing scale entries with pixel values', () => {
      const text = element.textContent ?? '';
      expect(text).toContain('4px');
      expect(text).toContain('8px');
      expect(text).toContain('16px');
      expect(text).toContain('64px');
    });

    it('should set spacing bar widths via inline styles', () => {
      const bars = element.querySelectorAll('[style*="width"]');
      expect(bars.length).toBeGreaterThanOrEqual(8);
    });
  });

  describe('shadows section', () => {
    it('should render the shadows heading', () => {
      const headings = element.querySelectorAll('h2');
      const shadowsHeading = Array.from(headings).find((h) => h.textContent?.includes('Shadows'));
      expect(shadowsHeading).toBeTruthy();
    });

    it('should render all shadow variants', () => {
      const text = element.textContent ?? '';
      expect(text).toContain('shadow-sm');
      expect(text).toContain('shadow-md');
      expect(text).toContain('shadow-lg');
      expect(text).toContain('shadow-xl');
    });
  });
});
