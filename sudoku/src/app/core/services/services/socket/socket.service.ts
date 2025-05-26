import { Injectable, Signal, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: Socket;
  private _messages = signal<any[]>([]);
  private _grid = signal<any | null>([]);
  private _rooms = signal<string[]>([]);

  get messages() {
    return this._messages;
  }

  get rooms() {
    return this._rooms;
  }

  get grid() {
    return this._grid;
  }

  constructor() {
    this.socket = io('http://localhost:3000'); // Adjust to your backend address

    this.socket.on('message', (message) => {
      this._messages.update(msgs => [...msgs, message]);
    });

    this.socket.on('messagesHistory', (history: any[]) => {
      this._messages.set(history);
    });

    this.socket.on('grid', (gridData) => {
      this._grid.set(gridData);
    });

    this.socket.on('gridHistory', (history: any[]) => {
      console.log("history: ", history)
      this._grid.set(history);
    });

    this.socket.on('roomsList', (rooms: string[]) => {
      this._rooms.set(rooms);
    });

    this.getRooms();
  }

  joinRoom(room: string) {
    this.socket.emit('joinRoom', room);
  }

  sendMessage(room: string, user: string, text: string) {
    console.log('message', room, user, text)
    this.socket.emit('message', { room, user, text });
  }

  updateGrid(gridData: any[], room: string) {
    this.socket.emit('grid', { gridData, room });
  }

  getRooms() {
    this.socket.emit('getRooms');
  }

  createRoom(room: string) {
    this.socket.emit('createRoom', room);
  }

  removeRoom(room: string) {
    this.socket.emit('removeRoom', room);
  }

  checkForRoom(room: string): boolean {
    if (this._rooms().find(x => x == room)) {
      return true;
    }
    return false;
  }
}
