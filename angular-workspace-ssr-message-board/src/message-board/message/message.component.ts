import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-message',
  imports: [],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss',
})
export class MessageComponent {
  @Input() messageInputObject: {
    mesageId: string;
    username: string;
    message: string;
  } = {
    mesageId: '1',
    username: 'User1',
    message: 'Hello, this is a message!',
  };
}
