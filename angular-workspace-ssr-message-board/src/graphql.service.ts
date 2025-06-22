import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Message } from './message-board/message-board.types';

interface GraphQLResponse<T> {
  data: T;
  errors?: Array<{
    message: string;
    locations?: Array<{
      line: number;
      column: number;
    }>;
    path?: string[];
  }>;
}
interface MessagesData {
  messages: Message[];
}
interface AddMessageData {
  addMessage: Message;
}

@Injectable({
  providedIn: 'root',
})
export class GraphqlService {
  private readonly graphqlEndpoint = '/api/graphql';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  private query<T>(query: string, variables?: any): Promise<T | undefined> {
    const body = {
      query,
      variables: variables || {},
    };

    return this.http
      .post<GraphQLResponse<T>>(this.graphqlEndpoint, body, this.httpOptions)
      .pipe(
        map((response) => {
          if (response.errors && response.errors.length > 0) {
            throw new Error(response.errors[0].message);
          }
          return response.data;
        }),
      )
      .toPromise();
  }

  // Get all messages
  async getMessages(): Promise<MessagesData | undefined> {
    const query = `
      query {
        messages {
          messageId
          message
          username
          createdAt
        }
      }
    `;

    return this.query<MessagesData>(query);
  }
  // Add a new message
  async addMessage(
    message: string,
    username: string,
  ): Promise<AddMessageData | undefined> {
    const mutation = `
      mutation AddMessage($message: String!, $username: String!) {
        addMessage(message: $message, username: $username) {
          messageId
          message
          username
          createdAt
        }
      }
    `;

    const variables = { message, username };
    return await this.query<AddMessageData>(mutation, variables);
  }
}
