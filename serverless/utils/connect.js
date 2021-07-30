const MongoClient = require("mongodb").MongoClient;
const { PULSA_EL_BOTON_DB_URL } = process.env;
module.exports = async function connectToDatabase() {
  const client = await MongoClient.connect(PULSA_EL_BOTON_DB_URL);
  const db = await client.db("web");
  return db;
}