import { Injectable } from '@angular/core';
import { MOCK_MESSAGES } from './message-board.constants';

@Injectable({
  providedIn: 'root',
})
export class MessageBoardService {
  constructor() {}
  messages = MOCK_MESSAGES;

  sendMessageToServer(message: string): void {}
}
