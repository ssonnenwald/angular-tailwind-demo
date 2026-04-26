import { Component, computed, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

interface User {
  id: number;
  name: string;
  email: string;
  role: 'Admin' | 'Editor' | 'Viewer';
  status: 'Active' | 'Inactive' | 'Pending';
  initials: string;
  color: string;
  lastSeen: string;
}

type ViewMode = 'table' | 'grid';

@Component({
  selector: 'app-users',
  imports: [MatIconModule],
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class Users {
  protected readonly searchQuery = signal('');
  protected readonly viewMode = signal<ViewMode>('table');

  protected readonly users: User[] = [
    {
      id: 1,
      name: 'Sarah Chen',
      email: 'sarah.chen@example.com',
      role: 'Admin',
      status: 'Active',
      initials: 'SC',
      color: 'bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-300',
      lastSeen: '2 min ago',
    },
    {
      id: 2,
      name: 'Mike Torres',
      email: 'mike.t@example.com',
      role: 'Editor',
      status: 'Active',
      initials: 'MT',
      color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
      lastSeen: '1 hour ago',
    },
    {
      id: 3,
      name: 'Aisha Patel',
      email: 'aisha.p@example.com',
      role: 'Editor',
      status: 'Active',
      initials: 'AP',
      color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
      lastSeen: '3 hours ago',
    },
    {
      id: 4,
      name: 'James Wilson',
      email: 'j.wilson@example.com',
      role: 'Viewer',
      status: 'Inactive',
      initials: 'JW',
      color: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',
      lastSeen: '2 days ago',
    },
    {
      id: 5,
      name: 'Elena Rodriguez',
      email: 'elena.r@example.com',
      role: 'Editor',
      status: 'Pending',
      initials: 'ER',
      color: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
      lastSeen: 'Never',
    },
    {
      id: 6,
      name: 'David Kim',
      email: 'dkim@example.com',
      role: 'Viewer',
      status: 'Active',
      initials: 'DK',
      color: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300',
      lastSeen: '20 min ago',
    },
    {
      id: 7,
      name: 'Priya Sharma',
      email: 'priya.s@example.com',
      role: 'Admin',
      status: 'Active',
      initials: 'PS',
      color: 'bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300',
      lastSeen: '5 hours ago',
    },
    {
      id: 8,
      name: 'Tom Bennett',
      email: 'tom.b@example.com',
      role: 'Viewer',
      status: 'Inactive',
      initials: 'TB',
      color: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300',
      lastSeen: '1 week ago',
    },
  ];

  protected readonly filteredUsers = computed(() => {
    const q = this.searchQuery().toLowerCase().trim();
    if (!q) return this.users;
    return this.users.filter(
      (u) => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q),
    );
  });

  protected statusClasses(status: User['status']): string {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300';
      case 'Inactive':
        return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300';
      case 'Pending':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300';
    }
  }

  protected statusDotClasses(status: User['status']): string {
    switch (status) {
      case 'Active':
        return 'bg-green-500';
      case 'Inactive':
        return 'bg-gray-400';
      case 'Pending':
        return 'bg-amber-500';
    }
  }
}
