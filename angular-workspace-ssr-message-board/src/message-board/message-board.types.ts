export type Message = {
  messageId: string;
  username: string;
  message: string;
  /**
   * Date.now()
   * milliseconds since epoch
   */
  createdAt: number;
};
