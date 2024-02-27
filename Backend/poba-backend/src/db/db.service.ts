import * as mysql from 'mysql';
import * as fs from 'fs';
import { PasswordService } from './password.service';

export class DbService {
  private connection;

  constructor() {
    this.connect();
    this.testConnection();
  }

  private connect() {
    this.connection = mysql.createConnection({
      host: 'poba-project-server.mysql.database.azure.com',
      user: 'izizvdeqos',
      password: 'SYW8433LFY7EPV7K$', // Replace with your actual password
      database: 'poba-project-database', // Replace with your actual database name
      port: 3306,
      ssl: {
        ca: fs.readFileSync('DigiCertGlobalRootCA.crt.pem') // Replace with the actual path to your CA certificate
      }
    });

    this.connection.connect(error => {
      if (error) {
        console.error('Error connecting to the database:', error);
        return;
      }
      console.log('Connection to the database established successfully.');
    });
  }

  public query(sql: string, args?: any[]): Promise<any> {
    return new Promise((resolve, reject) => {
      this.connection.query(sql, args, (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      });
    });
  }

  // Method to test the database connection
  public testConnection(): Promise<void> {
    return this.query('SELECT 1')
      .then(() => console.log('Database connection test successful.'))
      .catch((error) => console.error('Database connection test failed:', error));
  }

  // Ensure you have a method to close the connection when done
  public closeConnection() {
    if (this.connection) {
      this.connection.end((err) => {
        if (err) return console.log('error:' + err.message);
        console.log('Database connection closed.');
      });
    }
  }

   public async regUser(username: string, password: string): Promise<void> {
    this.query('INSERT INTO user (username, password) VALUES (?, ?)', [username, password]);
  }
}
