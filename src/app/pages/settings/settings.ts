import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-settings',
  imports: [FormsModule, MatIconModule],
  templateUrl: './settings.html',
  styleUrl: './settings.css',
})
export class Settings {
  protected profile = {
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane.doe@example.com',
    bio: 'Frontend engineer building delightful user experiences.',
  };

  protected readonly notifications = signal([
    {
      key: 'email',
      label: 'Email notifications',
      description: 'Get notified about important updates via email.',
      enabled: true,
    },
    {
      key: 'push',
      label: 'Push notifications',
      description: 'Receive push notifications on your devices.',
      enabled: true,
    },
    {
      key: 'marketing',
      label: 'Marketing emails',
      description: 'Receive product news, tips, and special offers.',
      enabled: false,
    },
    {
      key: 'mentions',
      label: 'Mentions and replies',
      description: 'Get notified when someone mentions you in a comment.',
      enabled: true,
    },
  ]);

  protected readonly themes = [
    { value: 'light', label: 'Light', icon: 'light_mode' },
    { value: 'dark', label: 'Dark', icon: 'dark_mode' },
    { value: 'system', label: 'System', icon: 'computer' },
  ];

  protected readonly selectedTheme = signal<string>('system');

  protected toggleNotification(key: string): void {
    this.notifications.update((items) =>
      items.map((item) => (item.key === key ? { ...item, enabled: !item.enabled } : item)),
    );
  }
}
