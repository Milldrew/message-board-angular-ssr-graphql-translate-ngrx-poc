import * as fse from 'fs-extra';
import { Message } from './message-board/message-board.types';
import { join } from 'node:path';
import { MessagesData } from './graphql.service';

const DATABASE_PATH = join(process.cwd(), 'message-board-database.json');

function doesDatabaseExist(): boolean {
  return fse.existsSync(DATABASE_PATH);
}

export function createDatabase(): void {
  if (!doesDatabaseExist()) {
    fse.writeFileSync(DATABASE_PATH, JSON.stringify([]));
    console.log('Database created at', DATABASE_PATH);
  } else {
    console.log('Database already exists at', DATABASE_PATH);
  }
}

export function getMessages(): MessagesData {
  if (doesDatabaseExist()) {
    const messages = fse.readJSONSync(DATABASE_PATH);
    console.log('---------------');
    console.log(messages);
    console.log('---------------');
    return { messages } as MessagesData;
  }
  return { messages: [] };
}

export function addMessage(message: Message) {
  createDatabase(); //guard against missing database
  const messageData = getMessages();
  messageData.messages.unshift(message);
  fse.writeJSONSync(
    DATABASE_PATH,
    { messages: messageData.messages },
    { spaces: 2 },
  );
}
