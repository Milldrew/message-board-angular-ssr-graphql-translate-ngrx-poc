import { Injectable } from '@angular/core';
import { MOCK_MESSAGES } from './message-board.constants';
import { GraphqlService } from '../graphql.service';
import { CoreService } from '../core.service';
import { Message } from './message-board.types';

@Injectable({
  providedIn: 'root',
})
export class MessageBoardService {
  constructor(
    private graphqlService: GraphqlService,
    private coreService: CoreService,
  ) {}
  messages = MOCK_MESSAGES;
  messageTextAreaText = '';

  sendMessageToServer(message: string): void {}
  async getAllMessages() {
    const payload = await this.graphqlService.getMessages();
    if (payload?.messages) {
      this.setMessages(payload.messages);
    } else {
      throw new Error('Failed to fetch messages');
    }
  }
  async addMessage() {
    console.log('adding message');
    const payload = await this.graphqlService.addMessage(
      this.messageTextAreaText,
      this.coreService.savedUsername,
    );
    console.log('addMessage payload', payload);
    if (payload?.addMessage) {
      this.messages.unshift(payload.addMessage);
    } else {
      throw new Error('Failed to add message');
    }
  }
  setMessages(messages: Message[]) {
    this.messages = messages.sort((a, b) => {
      return a.createdAt - b.createdAt;
    });
  }
}
