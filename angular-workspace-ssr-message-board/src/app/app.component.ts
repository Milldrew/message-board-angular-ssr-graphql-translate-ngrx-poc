import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MessageBoardComponent } from '../message-board/message-board.component';
import { CoreService } from '../core.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MessageBoardComponent,
    MatInputModule,
    FormsModule,
    MatFormFieldModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(public coreService: CoreService) {}
}
