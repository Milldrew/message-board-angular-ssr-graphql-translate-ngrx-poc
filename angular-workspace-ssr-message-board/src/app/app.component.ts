import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MessageBoardComponent } from '../message-board/message-board.component';
import { CoreService } from '../core.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MessageBoardService } from '../message-board/message-board.service';

//skip hydration import
//
@Component({
  selector: 'app-root',
  imports: [MessageBoardComponent, FormsModule, MatButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  constructor(
    public coreService: CoreService,
    private messageBoardService: MessageBoardService,
  ) {}
  async ngOnInit() {
    await this.messageBoardService.getAllMessages();
  }
}
