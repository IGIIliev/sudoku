import { Component, Input } from '@angular/core';
import { SudokuGridComponent } from '../../core/components/sudoku-grid/sudoku-grid.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { SocketService } from '../../core/services/services/socket/socket.service';
import { SudocuService } from '../../core/services/services/sudocu.service';
import { SudokuStateModel } from '../../core/models/sudoku-state.model';
import { StateService } from '../../core/state/state.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-single-player',
  imports: [CommonModule, MatButtonModule, SudokuGridComponent],
  templateUrl: './single-player-game.component.html',
  styleUrl: './single-player-game.component.scss'
})
export class SinglePlayerComponent {
  @Input() difficulty!: string;
  board: any;
  currentState: SudokuStateModel | null = null;

  constructor(
    public socket: SocketService,
    private state: StateService,
    private sudocuService: SudocuService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {
    this.currentState = this.state.getSudokuState;
  }

  ngOnInit(): void {
    this.getBoard(this.activeRoute.snapshot.paramMap.get('difficulty'));
  }

  navigateHome(): void {
    this.router.navigate(['/home']);
  }

  private getBoard(difficulty: string | null): void {
    this.sudocuService.getBoard(difficulty!).subscribe(res => {
      this.board = res;
      console.log(res)
      this.currentState!.board = res;
      this.state.setSudokuState(this.currentState!);
    });
  }
}
