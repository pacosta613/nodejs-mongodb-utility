'use strict';

const { MongoClient, ObjectID, ServerApiVersion } = require('mongodb');
const Logger = require('logplease');
const logger = Logger.create('utility:db', {

	useColors: true,
	showTimestamp: false,
	showLevel: true,
	filename: null,
	appendFile: true

});

logger.debug("Launched")

module.exports = function (url, collectionName) {
	const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
	const dbName = client.db(collectionName)
	async function connect() {
		try {
		  await client.connect();
		  Logger.log('Connected to MongoDB');
		} catch (err) {
			Logger.error('Error connecting to MongoDB:', err);
		  	console.error('Error connecting to MongoDB:', err);
		}
	}

	async function insert(collection, data) {
		const mongoCollection = dbName.collection(collection);
		try {
		  await mongoCollection.insertOne({ data });
		  console.log('Inserted one document');
		} catch (err) {
		  console.error('Error inserting one document:', err);
		}
	}

	async function findMany(collection) {
		const mongoCollection = dbName.collection(collection);
		try {
		  	const matches = await mongoCollection.find({}).toArray();
		  	return matches;
		} catch (err) {
		  	console.error('Error finding documents:', err);
		}
	}

	async function findOne(collection, data) {
		const mongoCollection = dbName.collection(collection);
		try {
		  	const matches = await mongoCollection.find({data}).toArray();
		  	return matches;
		} catch (err) {
		  	console.error('Error finding documents:', err);
		}
	}

	async function update(collection, data) {
		const mongoCollection = dbName.collection(collection);
		try {
			const result = await mongoCollection.updateOne(
				{ _id: data._id },
				{
				$set: {
					...data,
					_id: new ObjectID(data._id)
				}
				},
				{ upsert: true }
			);
			console.log('Updated one document');
			return result;

		} catch (err) {
		  	console.error('Error updating one document:', err);
		}
	}

	async function remove(collection, data) {
		const mongoCollection = dbName.collection(collection);
		try {
		  await mongoCollection.deleteOne({ _id: data._id });
		  console.log('Deleted one document');
		} catch (err) {
		  console.error('Error deleting one document:', err);
		}
	}
	  
	async function disconnect() {
		try {
		  await client.close();
		  console.log('Disconnected from MongoDB');
		} catch (err) {
		  console.error('Error disconnecting from MongoDB:', err);
		}
	}

	return {
		insert: insert,
		findMany: findMany,
		update: update,
		remove: remove,
		find: findOne,
		disconnect: disconnect,
	};

}