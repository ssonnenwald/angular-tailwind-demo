import { Component, inject } from '@angular/core';
import { LayoutState } from '../../core/layout-state';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.html',
})
export class Header {
  layout = inject(LayoutState);
}
