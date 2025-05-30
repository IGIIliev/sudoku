import { Component, Input } from '@angular/core';
import { MultiplayerComponent } from '../../core/components/multiplayer/multiplayer.component';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { SocketService } from '../../core/services/services/socket/socket.service';
import { SudocuService } from '../../core/services/services/sudocu.service';
import { StateService } from '../../core/state/state.service';
import { SudokuStateModel } from '../../core/models/sudoku-state.model';

@Component({
  selector: 'app-multiplayer-game',
  imports: [MatButtonModule, MultiplayerComponent],
  templateUrl: './multiplayer-game.component.html',
  styleUrl: './multiplayer-game.component.scss'
})
export class MultiplayerGameComponent {
  difficulty: string | null = null;
  board: any;
  currentState: SudokuStateModel | null = null;
  
  constructor(
    public socket: SocketService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {
    this.difficulty = this.activeRoute.snapshot.paramMap.get('difficulty')
  }

  ngOnInit(): void {
    this.difficulty = this.activeRoute.snapshot.paramMap.get('difficulty');
  }

  navigateHome(): void {
    this.router.navigate(['/home']);
  }

  cellChanged(board: any) {
    console.log(board)
  }
}
