import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { SocketService } from '../../services/services/socket/socket.service';

@Component({
  selector: 'app-messages-list',
  imports: [CommonModule, FormsModule, MatCardModule, MatIconModule],
  templateUrl: './messages-list.component.html',
  styleUrl: './messages-list.component.scss'
})
export class MessagesListComponent {
  @Input() user: string | null = "Me";

  newMessage = '';

  constructor(public socket: SocketService) { }
}
