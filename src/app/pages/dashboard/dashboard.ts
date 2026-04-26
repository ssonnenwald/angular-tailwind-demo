import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

interface Stat {
  label: string;
  value: string;
  change: string;
  trending: 'up' | 'down';
  icon: string;
  iconBg: string;
  iconColor: string;
}

interface Activity {
  user: string;
  action: string;
  target: string;
  time: string;
  initials: string;
  color: string;
}

@Component({
  selector: 'app-dashboard',
  imports: [MatIconModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  protected readonly stats: Stat[] = [
    {
      label: 'Total revenue',
      value: '$48,294',
      change: '+12.5%',
      trending: 'up',
      icon: 'attach_money',
      iconBg: 'bg-green-100 dark:bg-green-900/40',
      iconColor: 'text-green-600 dark:text-green-400',
    },
    {
      label: 'Active users',
      value: '2,841',
      change: '+8.2%',
      trending: 'up',
      icon: 'group',
      iconBg: 'bg-blue-100 dark:bg-blue-900/40',
      iconColor: 'text-blue-600 dark:text-blue-400',
    },
    {
      label: 'New orders',
      value: '184',
      change: '-3.1%',
      trending: 'down',
      icon: 'shopping_cart',
      iconBg: 'bg-amber-100 dark:bg-amber-900/40',
      iconColor: 'text-amber-600 dark:text-amber-400',
    },
    {
      label: 'Conversion',
      value: '3.42%',
      change: '+1.8%',
      trending: 'up',
      icon: 'trending_up',
      iconBg: 'bg-purple-100 dark:bg-purple-900/40',
      iconColor: 'text-purple-600 dark:text-purple-400',
    },
  ];

  protected readonly chartBars = [
    { label: 'Mon', value: 1240, height: 45 },
    { label: 'Tue', value: 1890, height: 68 },
    { label: 'Wed', value: 1420, height: 52 },
    { label: 'Thu', value: 2310, height: 84 },
    { label: 'Fri', value: 2750, height: 100 },
    { label: 'Sat', value: 1640, height: 60 },
    { label: 'Sun', value: 1180, height: 43 },
  ];

  protected readonly activities: Activity[] = [
    {
      user: 'Sarah Chen',
      action: 'commented on',
      target: 'Q4 Roadmap',
      time: '2 minutes ago',
      initials: 'SC',
      color: 'bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-300',
    },
    {
      user: 'Mike Torres',
      action: 'completed task',
      target: 'API integration',
      time: '1 hour ago',
      initials: 'MT',
      color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
    },
    {
      user: 'Aisha Patel',
      action: 'created',
      target: 'Design review doc',
      time: '3 hours ago',
      initials: 'AP',
      color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
    },
    {
      user: 'James Wilson',
      action: 'merged PR',
      target: '#1284',
      time: '5 hours ago',
      initials: 'JW',
      color: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',
    },
  ];
}
