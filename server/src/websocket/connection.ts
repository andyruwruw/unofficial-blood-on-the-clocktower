// Packages
import {
  connection as WebsocketConnection,
  Message as WebsocketMessage,
} from 'websocket';

// Local Imports
import { Message } from './message';
import { resolveHandler } from '../handlers';
import { SpotifyApi } from '../api/spotify';
import { Monitor } from '../helpers/monitor';
import { ResolveUser } from '../helpers/resolve-user';

/**
 * Wrapper around a websocket connection.
 */
export class Connection {
  /**
   * Connection ID.
   */
  _id: string;

  /**
   * Session token.
   */
  _session: string | null = null;

  /**
   * Websocket connection.
   */
  _connection: WebsocketConnection;

  /**
   * Messages failed to be sent.
   */
  _pending: WebsocketMessage[] = [];

  /**
   * Reference to user.
   */
  _user: ResolveUser | null = null;

  /**
   * Spotify API instance.
   */
  _spotify = new SpotifyApi();

  /**
   * Whether the connection is active.
   */
  _active = true;

  /**
   * Reference to function to remove reference to connection.
   */
  static removeConnection: (id: string) => void;

  /**
   * Instantiates a connection wrapper.
   *
   * @param {WebsocketConnection} connection Approved connection object. 
   */
  constructor(connection: WebsocketConnection) {
    this._connection = connection;
    this._id = Buffer.from(this._connection.remoteAddress).toString('hex');

    Monitor.log(
      Connection,
      `Connection created: ${this.getId()}`,
      Monitor.Layer.DEBUG,
    );

    this._connection.on('message', (message: WebsocketMessage) => this._handleMessage(message));
    this._connection.on('close', (
      code: number,
      description: string,
    ) => this._handleClose(
      code,
      description,
    ));

    this.send({
      name: 'user/checkSession',
      payload: {},
    });
  }

  /**
   * Sends data back through the connection.
   *
   * @param {Record<string, any>} data Payload object.
   */
  async send(data: Record<string, any>): Promise<void> {
    await this._connection.send(JSON.stringify(data));
  }

  /**
   * Sets user for session.
   *
   * @param {ResolveUser | null} user User data.
   */
  setUser(user: ResolveUser | null): void {
    this._user = user;
  }

  /**
   * Gets user for session.
   *
   * @returns {ResolveUser} user User data.
   */
  getUser(): ResolveUser | null {
    return this._user;
  }

  /**
   * Sets token for session.
   *
   * @param {string | null} token Session token.
   */
  setToken(token: string | null): void {
    this._session = token;
  }

  /**
   * Gets token for session.
   *
   * @returns {string | null} Session token..
   */
  getToken(): string | null {
    return this._session;
  }

  /**
   * Identifier for every connection.
   *
   * @returns {string} Connection ID.
   */
  getId(): string {
    return this._id;
  }

  /**
   * Retrieves Spotify API instance.
   *
   * @returns {SpotifyApi} Spotify API wrapper.
   */

  getSpotifyApi(): SpotifyApi {
    if (!this._user) {
      return new SpotifyApi();
    }
    return this._user.getSpotifyApi();
  }

  /**
   * Sets Spotify refresh token.
   *
   * @param {string} refreshToken Spotify refresh token.
   */
  setRefreshToken(refreshToken: string) {
    if (!this._user) {
      return;
    }
  
    this._user.setRefreshToken(refreshToken);
  }

  /**
   * Sets Spotify access token.
   *
   * @param {string} accessToken Spotify access token.
   */
  setAccessToken(accessToken: string) {
    if (!this._user) {
      return;
    }

    this._user.setAccessToken(accessToken);
  }

  /**
   * Removes Spotify access token.
   */
  resetSpotify(): void {
    this._spotify = new SpotifyApi();
  }

  /**
   * Whether the connection is active.
   *
   * @returns {boolean} Whether the connection is active.
   */
  isOpen(): boolean {
    return this._active;
  }

  /**
   * Handles an incoming message from a verified connection.
   *
   * @param {Connection} connection Websocket connection.
   * @param {WebsocketMessage} rawMessage Incoming message.
   */
  async _handleMessage(rawMessage: WebsocketMessage): Promise<void> {
    const message = new Message(rawMessage);

    console.log(message.getSection(), message.getAction());

    try {
      const handler = new (resolveHandler(
        message.getSection(),
        message.getAction(),
      ))();

      await handler.execute(
        this,
        message.getPayload(),
      );
    } catch (error) {
      Monitor.log(
        Connection,
        `Error handling message: ${error} - ${message.getSection()}:${message.getAction()}`,
        Monitor.Layer.WARNING,
      );
    }
  }

  /**
   * Handles a connection close.
   *
   * @param {number} code Status code of close. 
   * @param {string} description Description of reason for close.
   */
  async _handleClose(
    code: number,
    description: string,
  ): Promise<void> {
    this._active = false;
    Connection.removeConnection(this.getId());
  }

  /**
   * Handles a connection error.
   *
   * @param {Error} error Error object.
   */
  async _handleError(error: Error): Promise<void> {
    Monitor.log(
      Connection,
      `Connection error: ${error}`,
      Monitor.Layer.WARNING,
    );
  }
}
