import { Component, inject, OnInit, signal } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  private readonly iconRegistry = inject(MatIconRegistry);

  ngOnInit(): void {
    // This is the missing link!
    this.iconRegistry.setDefaultFontSetClass('material-symbols-outlined');
  }
}
