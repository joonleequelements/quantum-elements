import { CoreService } from './core/core.service';
import { SharedModule } from './shared/shared.module';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  providers: [CoreService],
  imports: [CommonModule, FormsModule, RouterOutlet, RouterLink, RouterLinkActive, SharedModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'quantum-elements-webapp';
  constructor(private router: Router) { }
  getCurrentRoute() {
    return this.router.url.split('/')[1]
  }
}
