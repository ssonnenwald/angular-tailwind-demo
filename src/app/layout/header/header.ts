import { Component, inject } from '@angular/core';
import { LayoutService } from '../../core/layout-service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.html',
  imports: [MatIconModule],
})
export class Header {
  protected readonly layout = inject(LayoutService);
}
