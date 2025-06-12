import { Pool, QueryResultRow } from "pg";

class Database {
  pool: Pool;
  //client: PoolClient | undefined;

  constructor() {
    this.pool = new Pool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
      ssl: process.env.SSL ? /true/.test(process.env.SSL) : false,
    });

    // Optional: Log when connection to the database is established
    this.pool.on("connect", () => {
      //console.log("Connected to the PostgreSQL database");
    });

    // Optional: Log any errors with the database connection
    this.pool.on("error", (err) => {
      console.error("Unexpected error on idle client", err);
      process.exit(-1);
    });
  }

  async query<Type extends QueryResultRow>(text: string, params: string[]) {
    const client = await this.pool.connect();
    const res = await client.query<Type>(text, params);
    client.release();
    //await this.close();
    return res;
  }

  async close() {
    await this.pool.end();
    console.log("Closed database connection");
  }
}

export default new Database();
