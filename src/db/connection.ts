import * as mongodb from 'mongodb';
import { ServerApiVersion, MongoClient } from 'mongodb';

const uri: string = process.env.ATLAS_MONGODB || "mongodb+srv://naishal036:jl1iVgGj8BDAMLKm@cluster0.mvn5kle.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new mongodb.MongoClient(uri, { serverApi: { version: ServerApiVersion.v1, strict: true, deprecationErrors: true } });
let db: mongodb.Db=client.db("GG");;

async function connectToDatabase() {
  try {
    await client.connect();
    await client.db("GG").command({ ping: 1 });
    console.log("Connected successfully to server");

  } catch (e) {
    console.log(e);
  }
}

connectToDatabase();

export default db;