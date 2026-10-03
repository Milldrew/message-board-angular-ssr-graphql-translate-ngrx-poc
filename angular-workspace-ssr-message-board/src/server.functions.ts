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

/** The newest 200 messages are kept; the file used to grow without limit. */
const MAX_MESSAGES = 200;

export function addMessage(message: Message) {
  const messages = getMessages().slice(0, MAX_MESSAGES - 1);
  messages.unshift(message);
  createDatabase(); //guard against missing database
  fse.writeJSONSync(DATABASE_PATH, { messages }, { spaces: 2 });
}
