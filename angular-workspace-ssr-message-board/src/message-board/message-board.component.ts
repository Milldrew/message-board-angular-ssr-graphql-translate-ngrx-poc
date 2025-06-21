import { Component } from '@angular/core';
import { MessageComponent } from './message/message.component';

@Component({
  selector: 'app-message-board',
  imports: [MessageComponent],
  templateUrl: './message-board.component.html',
  styleUrl: './message-board.component.scss',
})
export class MessageBoardComponent {}
