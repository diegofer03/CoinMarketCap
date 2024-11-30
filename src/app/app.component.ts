import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ HomeComponent],
  template: `<app-home/>`,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'CoinMarketCap';
}
