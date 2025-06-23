import { Component } from '@angular/core';
import { MessageComponent } from './message/message.component';
import { MessageBoardService } from './message-board.service';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { CoreService } from '../core.service';

@Component({
  selector: 'app-message-board',
  imports: [
    DatePipe,
    MessageComponent,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
  ],
  templateUrl: './message-board.component.html',
  styleUrl: './message-board.component.scss',
})
export class MessageBoardComponent {
  constructor(
    public messageBoardService: MessageBoardService,
    public coreService: CoreService,
  ) {}
  scrollToTopOfMessages() {
    const scrollablePane = document.getElementById('scrollable');
    if (scrollablePane) {
      scrollablePane.scrollTop = 0;
    }
  }
}
