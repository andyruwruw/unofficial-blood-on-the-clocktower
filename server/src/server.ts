// Local Imports
import { getDatabase } from './database';
import { Database } from './database/database';
import { WebSocketServer } from './websocket';

/**
 * General class for the entire server.
 */
export class Server {
  /**
   * Static reference to websocket server.
   */
  static websocket: WebSocketServer;

  /**
   * Static reference to database.
   */
  static database: Database;

  /**
   * Initializes server.
   */
  static initialize(): void {
    WebSocketServer.start();
    Server.database = getDatabase();
  }

  /**
   * Creates all tasks.
   */
  static async createTasks(): Promise<void> {
    const backlog = await Server.database.backlog.find({});
  }

  /**
   * Connects various required systems.
   */
  static async run() {
    await Server.database.connect();
  }
}
