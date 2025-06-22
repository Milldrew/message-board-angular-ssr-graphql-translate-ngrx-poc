import { Component } from '@angular/core';
import { MessageComponent } from './message/message.component';
import { MessageBoardService } from './message-board.service';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-message-board',
  imports: [MessageComponent, MatCardModule, MatInputModule, MatButtonModule],
  templateUrl: './message-board.component.html',
  styleUrl: './message-board.component.scss',
})
export class MessageBoardComponent {
  constructor(public messageBoardService: MessageBoardService) {}
}
