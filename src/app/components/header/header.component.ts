import { Component } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';

@Component({
  selector: 'header-component',
  standalone: true,
  imports: [MatToolbarModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
