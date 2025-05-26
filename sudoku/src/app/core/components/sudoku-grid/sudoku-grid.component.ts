import { Component, EventEmitter, Input, model, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SudokuCellComponent } from './sudoku-cell/sudoku-cell.component';
import { MatButtonModule } from '@angular/material/button';
import { SudocuService } from '../../services/services/sudocu.service';
import { SocketService } from '../../services/services/socket/socket.service';
import { SudokuCellModel } from '../../models/sudoku-cell.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sudoku-grid',
  imports: [CommonModule, SudokuCellComponent, MatButtonModule],
  templateUrl: './sudoku-grid.component.html',
  styleUrl: './sudoku-grid.component.scss'
})
export class SudokuGridComponent {
  board = model<any | null>([]);
  @Input() currentRoom: string | null = '';
  @Output() gridGenerated = new EventEmitter<any>();

  user: string | null = '';
  dificalty: string | null = null;
  isMultyplayer: boolean | null = false;
  blocks: SudokuCellModel[][] = [];

  constructor(
    public socket: SocketService,
    private sudocuService: SudocuService,
    private router: ActivatedRoute
  ) { }

  ngOnChanges() {
    // check if we ar in multiplayer mode and set socket data to the grid
    if (this.isMultyplayer) {
      this.board.set(this.socket.grid());
      this.generateSudokuData(this.socket.grid().length == 0 ? true : false);
    }
  }

  ngOnInit(): void {
    this.user = this.router.snapshot.paramMap.get('name');
    this.dificalty = this.router.snapshot.paramMap.get('dificalty');
    this.isMultyplayer = this.router.snapshot.paramMap.get('isMultyplayer') === 'true';
  }

  cellChanged(event: SudokuCellModel): void {
    this.board.update(x => {
      x.board[event.oldCoordinates.x][event.oldCoordinates.y] = event.value;
      return x;
    });
    if (this.isMultyplayer) {
      this.gridGenerated.emit(this.board());
    }
  }

  generateSudokuData(initialGeneration: boolean = false): void {
    this.getBoard(this.dificalty!)
    this.blocks = this.blocksToBoard(this.board().board, initialGeneration);

  }

  validate(): void {
    console.log("Data to send for validation: ", this.board());
    // this.sudocuService.solve(this.board()).subscribe(res => {
    //   console.log(res)
    // });
  }

  solve(): void {
    console.log("Data to send for solving: ", this.board());
    // this.sudocuService.validate(this.board()).subscribe(res => {
    //   console.log(res)
    // });
  }

  blocksToBoard(blocks: number[][], initialGeneration: boolean = false): SudokuCellModel[][] {
    const board = Array.from({ length: 9 }, () => Array(9).fill(0));

    for (let blockIndex = 0; blockIndex < 9; blockIndex++) {
      const blockRow = Math.floor(blockIndex / 3);
      const blockCol = blockIndex % 3;

      for (let i = 0; i < 9; i++) {
        const cellRow = Math.floor(i / 3);
        const cellCol = i % 3;

        const row = blockRow * 3 + cellRow;
        const col = blockCol * 3 + cellCol;

        board[row][col] = {
          value: blocks[blockIndex][i],
          oldCoordinates: { x: blockIndex, y: i },
          newCoordinates: { x: row, y: col },
          enabled: initialGeneration ? blocks[blockIndex][i] == 0 ? false : true : false
        };
      }
    }

    return board;
  }

  private getBoard(difficulty: string): void {
    this.sudocuService.getBoard(difficulty).subscribe(res => {
      if (this.isMultyplayer && this.socket.grid().length != 0) {
        this.board.set(this.socket.grid());
      }
      else {
        this.board.set(res);
      }
    });
  }

}
