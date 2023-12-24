// Packages
import {
  request as Request,
  server as Server,
} from 'websocket';

// Local Imports
import { Connection } from './connection';
import { Database } from '../database/database';
import { getDatabase } from '../database';
import { generateWebSocketServer } from '../helpers/websocket';
import { verifyConnection } from '../helpers/authentication';
import { BacklogHandler } from '../utils/handle-backlog';
import { SpotifyApi } from '../api/spotify';

export class WebSocketServer {
  /**
   * Internal websocket server.
   */
  static _server?: Server;

  /**
   * Connection with websites.
   */
  static _connections: Record<string, Connection> = {};

  /**
   * Reference to database connection.
   */
  static _database: Database;

  /**
   * Starts internal servers and event listeners.
   *
   * @param {Server | null} server Optional websocket server instance override.
   */
  static start(server: Server | null = null) {
    WebSocketServer._createServer(server);
    WebSocketServer._connectToDatabase();

    BacklogHandler.setServerReference(WebSocketServer);
    WebSocketServer.scheduleBacklog();

    SpotifyApi.initialize();
  }

  /**
   * Retrieves database connection.
   *
   * @returns {Database} Database connection.
   */
  static getDatabase(): Database {
    return WebSocketServer._database;
  }

  /**
   * Schedules backlog checks.
   */
  static scheduleBacklog(): void {
    setInterval(BacklogHandler.checkBacklog, (1000 * 60 * 60 * 24));
  }

  /**
   * Retrieves a connection by ID.
   *
   * @param {string} id Id of connection.
   * @returns {Connection | null} Connection if exists.
   */
  static getConnection(id: string): Connection | null {
    // Direct window Id.
    if (id in WebSocketServer._connections) {
      return WebSocketServer._connections[id];
    }

    // User Spotify Id.
    const keys = Object.keys(WebSocketServer._connections);
    for (let i = 0; i < keys.length; i += 1) {
      const user = WebSocketServer._connections[keys[i]].getUser();

      if (user && user.getId() === id) {
        return WebSocketServer._connections[keys[i]];
      }
    }

    return null;
  }

  /**
   * Deletes reference to connection.
   *
   * @param {string} id Id of connection.
   */
  static closeConnection(id: string) {
    delete WebSocketServer._connections[id];
  }

  /**
   * Creates internal servers and sets listeners when finished.
   * 
   * @param {server | null} server Optional websocket server instance override.
   */
  static async _createServer(server: Server | null): Promise<void> {
    if (WebSocketServer._server) {
      return;
    }

    Connection.removeConnection = WebSocketServer.closeConnection;

    WebSocketServer._server = server ? server : await generateWebSocketServer();

    // Adding websocket event listeners.
    (WebSocketServer._server as Server).on('request', (request: Request) => WebSocketServer._handleRequest(request));
  }

  /**
   * Establishes connetion with database.
   */
  static async _connectToDatabase(): Promise<void> {
    WebSocketServer._database = getDatabase();

    await WebSocketServer._database.connect();
  }

  /**
   * Handles an incoming connection request by verifying the connection.
   *
   * @param {Request} request Incoming connection request.
   */
  static async _handleRequest(request: Request): Promise<void> {
    if (!verifyConnection(request)) {
      request.reject();
    }

    const approvedRequest = request.accept(
      undefined,
      request.origin,
    );

    const connection = new Connection(approvedRequest);

    WebSocketServer._connections[connection.getId()] = connection;
  }
}
