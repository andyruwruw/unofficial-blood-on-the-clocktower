// Types
import {
  IUtf8Message,
  Message as WebsocketMessage,
} from 'websocket';

/**
 * Parsed UTF8 message shape.
 */
interface MessageData {
  /**
   * Path to handler.
   */
  action: string;

  /**
   * Handler payload.
   */
  data: Record<string, any>;
}

/**
 * Wrapper for parsing UTF8 messages.
 */
export class Message {
  /**
   * Path to handler.
   */
  _path: string[];

  /**
   * Payload for handler.
   */
  _payload: Record<string, any>;

  /**
   * Instantiates a mesage handler.
   *
   * @param {WebsocketMessage} message Recieved message.
   */
  constructor(message: WebsocketMessage) {
    const data = JSON.parse((message as IUtf8Message).utf8Data) as MessageData;

    this._path = data.action.split('/');
    this._payload = data.data;
  }

  /**
   * Retrieve section of handler.
   * 
   * @type {string}
   */
  getSection(): string {
    return this._path[0];
  }

  /**
   * Retrieve action of handler.
   * 
   * @type {string}
   */
  getAction(): string {
    return this._path[1];
  }

  /**
   * Retrieves the payload for the handler.
   *
   * @returns {Record<string, any>} Parsed payload.
   */
  getPayload(): Record<string, any> {
    return this._payload;
  }
}
