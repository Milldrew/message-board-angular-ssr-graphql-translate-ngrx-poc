import { Injectable } from '@angular/core';

type Message = {
  id: number;
  username: string;
};

@Injectable({
  providedIn: 'root',
})
export class MessageBoardService {
  constructor() {}
}
