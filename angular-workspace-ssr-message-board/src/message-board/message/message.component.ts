import { Component, Input } from '@angular/core';
import { Message } from '../message-board.types';

@Component({
  selector: 'app-message',
  imports: [],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss',
})
export class MessageComponent {
  @Input() messageInputObject: Message;
}
