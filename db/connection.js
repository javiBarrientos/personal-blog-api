import { MongoClient } from "mongodb";
import "../loadEnvironment.js";

const connectionString = process.env.DATABASE_URL || "";
const client = new MongoClient(connectionString);

let connection;

try {
  connection = await client.connect();
} catch (e) {
  console.error(e);
}

let database = connection.db("blog");
export default database;
