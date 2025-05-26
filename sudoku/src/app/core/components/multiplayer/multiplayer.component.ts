import { Component, Input, model, viewChild, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { SudokuGridComponent } from "../sudoku-grid/sudoku-grid.component";
import { ActivatedRoute } from '@angular/router';
import { SocketService } from '../../services/services/socket/socket.service';
import { MessagesListComponent } from '../messages-list/messages-list.component';
import { SudokuCellModel } from '../../models/sudoku-cell.model';

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
  dificalty: string | null = null;
  isMultyplayer: boolean | null = false;
  blocks: SudokuCellModel[][] = [];

  constructor(
    public socket: SocketService,
    private router: ActivatedRoute
  ) {
    this.user = this.router.snapshot.paramMap.get('name');
    this.dificalty = this.router.snapshot.paramMap.get('dificalty');
    this.isMultyplayer = this.router.snapshot.paramMap.get('isMultyplayer') === 'true';
  }

  ngOnInit() {
    this.user = this.router.snapshot.paramMap.get('name');
    this.dificalty = this.router.snapshot.paramMap.get('dificalty');
    this.isMultyplayer = this.router.snapshot.paramMap.get('isMultyplayer') === 'true';
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
    console.log(this.currentRoom, this.user!, this.textMessage)
    if (this.textMessage.trim()) {
      this.socket.sendMessage(this.currentRoom, this.user!, this.textMessage);
      this.textMessage = '';
    }
  }

  loadGrid(event: any): void {
    console.log("event: ", event)
    this.socket.updateGrid(event, this.currentRoom)
  }
}
