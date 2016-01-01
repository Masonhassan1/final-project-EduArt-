import "dotenv/config";
import mongoose from "mongoose";

async function connectMongoose() {
  const _pwd = process.env.MONGO_DB_PASSWORD; // Unterstrich (_) soll betonen, dass es sich sozusagen um eine "private" VAriable handelt
  const _database = process.env.MONGO_DB_NAME;
  const _user = process.env.MONGO_DB_USER;
  const _cluster = process.env.MONGO_DB_CLUSTER;
  const _uri = `mongodb+srv://${_user}:${_pwd}@${_cluster}/${_database}`;

  try {
    await mongoose.connect(_uri);

    // nice to have: Zeige mir alle collections der Datenbank in der console
    const collections = (
      await mongoose.connection.db.listCollections().toArray()
    ).map((el) => el.name);
    console.log(`collections of '${_database}' db`, collections);

    return true;
  } catch (error) {
    console.log("Could not connect to mongoose:", error);
    return false;
  }
}

export default connectMongoose;
