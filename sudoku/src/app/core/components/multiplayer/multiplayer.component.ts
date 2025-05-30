import { Component, Input, model, viewChild, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { SudokuGridComponent } from "../sudoku-grid/sudoku-grid.component";
import { ActivatedRoute, Router } from '@angular/router';
import { SocketService } from '../../services/services/socket/socket.service';
import { MessagesListComponent } from '../messages-list/messages-list.component';
import { SudokuCellModel } from '../../models/sudoku-cell.model';
import { SudokuStateModel } from '../../models/sudoku-state.model';
import { StateService } from '../../state/state.service';
import { SudocuService } from '../../services/services/sudocu.service';

@Component({
  selector: 'app-multiplayer',
  imports: [CommonModule, FormsModule, MatListModule, MatIconModule, MatButtonModule, MatInputModule, SudokuGridComponent, SudokuGridComponent, MessagesListComponent],
  templateUrl: './multiplayer.component.html',
  styleUrl: './multiplayer.component.scss'
})
export class MultiplayerComponent {
  @Input() difficulty: string | null = null;
  board = model<any | null>([]);
  currentState: SudokuStateModel | null = null;
  textMessage = '';
  newRoom = '';
  currentRoom = '';
  user: string | null = 'Default Name';
  blocks: SudokuCellModel[][] = [];

  constructor(
    public socket: SocketService,
    private sudocuService: SudocuService,
    private router: Router,
    private state: StateService
  ) {
    this.currentState = this.state.getSudokuState;

    if(this.currentState == null) {
      this.router.navigate(['/home']);
    }
    else {
      this.user = this.currentState!.userName;
      this.difficulty = this.currentState!.difficulty;
    }
  }

  createRoom() {
    if (this.newRoom.trim()) {
      this.socket.createRoom(this.newRoom.trim());
      this.getBoard(this.difficulty, this.newRoom.trim());
      this.newRoom = '';
    }
  }

  deleteRoom(room: any) {
    this.currentRoom = '';
    this.socket.removeRoom(room);
  }

  join(room: string) {
    this.currentRoom = room;
    this.socket.joinRoom(room);   
    this.board.set(this.socket.grid());
  }

  sendMessage() {
    if (this.textMessage.trim()) {
      this.socket.sendMessage(this.currentRoom, this.user!, this.textMessage);
      this.textMessage = '';
    }
  }

  cellChanged(board: any): void {
    this.socket.updateGrid(board, this.currentRoom);
    this.board.set(board);
  }

  private getBoard(difficulty: string | null, newRoom: string = ''): void {
    this.sudocuService.getBoard(difficulty!).subscribe(res => { 
      this.board.set(res);
      this.currentState!.board = res;
      this.state.setSudokuState(this.currentState!);
      this.socket.updateGrid(res, newRoom);
    });
  }
}
