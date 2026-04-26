import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

interface ColorRamp {
  name: string;
  prefix: string;
  shades: { weight: string; class: string; hex: string }[];
}

@Component({
  selector: 'app-styleguide',
  imports: [MatIconModule],
  templateUrl: './styleguide.html',
  styleUrl: './styleguide.css',
})
export class Styleguide {
  protected readonly colorRamps: ColorRamp[] = [
    {
      name: 'Indigo (primary)',
      prefix: 'indigo',
      shades: this.buildShades('indigo', [
        '#eef2ff',
        '#e0e7ff',
        '#c7d2fe',
        '#a5b4fc',
        '#818cf8',
        '#6366f1',
        '#4f46e5',
        '#4338ca',
        '#3730a3',
        '#312e81',
      ]),
    },
    {
      name: 'Gray (neutral)',
      prefix: 'gray',
      shades: this.buildShades('gray', [
        '#f9fafb',
        '#f3f4f6',
        '#e5e7eb',
        '#d1d5db',
        '#9ca3af',
        '#6b7280',
        '#4b5563',
        '#374151',
        '#1f2937',
        '#111827',
      ]),
    },
    {
      name: 'Green (success)',
      prefix: 'green',
      shades: this.buildShades('green', [
        '#f0fdf4',
        '#dcfce7',
        '#bbf7d0',
        '#86efac',
        '#4ade80',
        '#22c55e',
        '#16a34a',
        '#15803d',
        '#166534',
        '#14532d',
      ]),
    },
    {
      name: 'Red (danger)',
      prefix: 'red',
      shades: this.buildShades('red', [
        '#fef2f2',
        '#fee2e2',
        '#fecaca',
        '#fca5a5',
        '#f87171',
        '#ef4444',
        '#dc2626',
        '#b91c1c',
        '#991b1b',
        '#7f1d1d',
      ]),
    },
  ];

  protected readonly spacingScale = [
    { name: '1', px: '4px', value: 4 },
    { name: '2', px: '8px', value: 8 },
    { name: '3', px: '12px', value: 12 },
    { name: '4', px: '16px', value: 16 },
    { name: '6', px: '24px', value: 24 },
    { name: '8', px: '32px', value: 32 },
    { name: '12', px: '48px', value: 48 },
    { name: '16', px: '64px', value: 64 },
  ];

  protected readonly shadows = [
    { name: 'shadow-sm', class: 'shadow-sm' },
    { name: 'shadow', class: 'shadow' },
    { name: 'shadow-md', class: 'shadow-md' },
    { name: 'shadow-lg', class: 'shadow-lg' },
    { name: 'shadow-xl', class: 'shadow-xl' },
  ];

  private buildShades(prefix: string, hexes: string[]) {
    const weights = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'];
    return weights.map((w, i) => ({
      weight: w,
      class: `bg-${prefix}-${w}`,
      hex: hexes[i],
    }));
  }
}
