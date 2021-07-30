const MongoClient = require("mongodb").MongoClient;
const { MONGODB_URI } = process.env;
module.exports = async function connectToDatabase() {
  const client = await MongoClient.connect(MONGODB_URI);
  const db = await client.db("web");
  return db;
}