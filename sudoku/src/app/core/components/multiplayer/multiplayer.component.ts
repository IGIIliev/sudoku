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

@Component({
  selector: 'app-multiplayer',
  imports: [CommonModule, FormsModule, MatListModule, MatIconModule, MatButtonModule, MatInputModule, SudokuGridComponent, SudokuGridComponent, MessagesListComponent],
  templateUrl: './multiplayer.component.html',
  styleUrl: './multiplayer.component.scss'
})
export class MultiplayerComponent {
  textMessage = '';
  newRoom = '';
  currentRoom = '';
  user: string | null = 'Default Name';
  difficulty: string | null = null;
  currentState: SudokuStateModel | null = null;
  isMultyplayer: boolean | null = false;
  blocks: SudokuCellModel[][] = [];

  constructor(
    public socket: SocketService,
    private activeRoute: ActivatedRoute,
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

    this.isMultyplayer = this.activeRoute.snapshot.paramMap.get('isMultyplayer') === 'true';
  }

  createRoom() {
    if (this.newRoom.trim()) {
      this.socket.createRoom(this.newRoom.trim());
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
  }

  sendMessage() {
    if (this.textMessage.trim()) {
      this.socket.sendMessage(this.currentRoom, this.user!, this.textMessage);
      this.textMessage = '';
    }
  }

  loadGrid(event: any): void {
    this.socket.updateGrid(event, this.currentRoom)
  }
}
