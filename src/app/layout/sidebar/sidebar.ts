import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { LayoutService } from '../../core/layout-service';

interface NavItem {
  route: string;
  icon: string;
  label: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MatIconModule],
  templateUrl: './sidebar.html',
})
export class Sidebar {
  protected readonly layout = inject(LayoutService);

  protected readonly navItems: NavItem[] = [
    { route: '/dashboard', icon: 'dashboard', label: 'Dashboard' },
    { route: '/users', icon: 'group', label: 'Users' },
    { route: '/settings', icon: 'settings', label: 'Settings' },
    { route: '/styleguide', icon: 'palette', label: 'Style guide' },
  ];
}
