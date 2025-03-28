import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB;

if (!uri) throw new Error('Por favor, defina a variável de ambiente MONGODB_URI no .env.local');
if (!dbName) throw new Error('Por favor, defina a variável de ambiente MONGODB_DB no .env.local');

let cached = global._mongo || { client: null, db: null };

export async function connectToDatabase() {
  if (!cached.client) {
    cached.client = new MongoClient(uri);
    await cached.client.connect();
    cached.db = cached.client.db(dbName);
  }
  return { client: cached.client, db: cached.db };
}

global._mongo = cached;
