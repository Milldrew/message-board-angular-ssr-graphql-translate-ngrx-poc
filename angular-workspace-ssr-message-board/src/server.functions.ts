import * as fse from 'fs-extra';
import { Message } from './message-board/message-board.types';
import { join } from 'path';

const DATABASE_PATH = join(process.cwd(), './database.json');

function doesDatabaseExist(): boolean {
  return fse.existsSync(DATABASE_PATH);
}

export function createDatabase(): void {
  if (!doesDatabaseExist()) {
    fse.writeJSONSync(DATABASE_PATH, { messages: [] }, { spaces: 2 });
  } else {
    console.log('Database already exists at', DATABASE_PATH);
  }
}

export function getMessages(): Message[] {
  if (doesDatabaseExist()) {
    return fse.readJSONSync(DATABASE_PATH).messages;
  }
  return [];
}

export function addMessage(message: Message) {
  const messages = getMessages();
  messages.unshift(message);
  createDatabase(); //guard against missing database
  fse.writeJSONSync(DATABASE_PATH, { messages }, { spaces: 2 });
}
