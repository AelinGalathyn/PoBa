import { Basket, Customer, Invoice, Item, Order, Packages, Shipping, User } from './db.dtos';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export class DbService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Basket)
    private basketRepository: Repository<Basket>,

    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,

    @InjectRepository(Invoice)
    private invoiceRepository: Repository<Invoice>,

    @InjectRepository(Item)
    private itemRepository: Repository<Item>,
    
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,

    @InjectRepository(Packages)
    private packageRepository: Repository<Packages>,

    @InjectRepository(Shipping)
    private shippingRepository: Repository<Shipping>,
  ){}

  async testConnection(): Promise<void> {
    try {
      const result = await this.userRepository.query('SELECT 1');
      console.log('Database connection test successful.', result);
    } catch (error) {
      console.error('Database connection test failed:', error);
    }
  }

  
  
  /*private connection;

  constructor() {
    this.connect();
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

   public async regUser(username: string, password: string): Promise<User> {
    await this.query('INSERT INTO user (username, password) VALUES (?, ?)', [username, password]);
    const user = await this.query('SELECT userid, username, password FROM user WHERE username = ?;', [username]);
    return user;
  }

  public async newAPI(apiKeyEncoded: string, userid: number): Promise<void> {
    this.query('UPDATE user SET `unas-api` = ? WHERE userid = ?);', [apiKeyEncoded, userid]);
  }*/
}
