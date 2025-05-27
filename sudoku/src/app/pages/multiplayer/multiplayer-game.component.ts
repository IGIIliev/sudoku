import { Component } from '@angular/core';
import { MultiplayerComponent } from '../../core/components/multiplayer/multiplayer.component';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-multiplayer-game',
  imports: [MatButtonModule, MultiplayerComponent],
  templateUrl: './multiplayer-game.component.html',
  styleUrl: './multiplayer-game.component.scss'
})
export class MultiplayerGameComponent {
  
  constructor(
    private router: Router
  ) {}

  navigateHome(): void {
    this.router.navigate(['/home']);
  }
}
