import { Component } from '@angular/core';
import { SudokuGridComponent } from '../../core/components/sudoku-grid/sudoku-grid.component';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-single-player',
  imports: [MatButtonModule,SudokuGridComponent],
  templateUrl: './single-player-game.component.html',
  styleUrl: './single-player-game.component.scss'
})
export class SinglePlayerComponent {

  constructor(
    private router: Router
  ) {}

  navigateHome(): void {
    this.router.navigate(['/home']);
  }
}
