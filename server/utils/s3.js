// const { MongoClient } = require('mongodb');
// const fs = require('fs');
// const { v4: uuidv4 } = require('uuid'); // Import uuidv4 function


// const uri = process.env.MONGO_URI; // Update with your MongoDB URI
// const dbName =  process.env.DATABASE_NAME; // Update with your database name
// var mongodb = require('mongodb');

// // Upload file to MongoDB GridFS
// exports.uploadFile = async (file) => {
//   const client = new MongoClient(uri, { useUnifiedTopology: true });
  
//   try {
//     await client.connect();
//     console.log('Connected to MongoDB');
    
//     const db = client.db(dbName);
//     const bucket = new mongodb.GridFSBucket(db, { bucketName: 'uploads' });
    
//     const fileStream = fs.createReadStream(file.path);
//     const uniqueKey = uuidv4(); // Generate a unique UUID
//     const uploadStream = bucket.openUploadStream(uniqueKey); // Use UUID as the key
    
//     fileStream.pipe(uploadStream);
    
//     await new Promise((resolve, reject) => {
//       uploadStream.on('finish', resolve);
//       uploadStream.on('error', reject);
//     });
    
//     console.log('File uploaded successfully with key:', uniqueKey);
//     return {Key: uniqueKey}
//   } catch (error) {
//     console.error('Error:', error);
//   } finally {
//     client.close();
//   }
// };

// // Get file from MongoDB GridFS
// exports.getFileStream = async (fileKey) => {
//   const client = new MongoClient(uri, { useUnifiedTopology: true });
  
//   try {
//     await client.connect();
    
//     const db = client.db(dbName);
//     const bucket = new mongodb.GridFSBucket(db, { bucketName: 'uploads' });
    
//     const downloadStream = bucket.openDownloadStreamByName(fileKey);
    
//     return downloadStream;
//   } catch (error) {
//     console.error('Error:', error);
//   }
// };

// // (async () => {


// //   const uniqueKey = '308f60bd-0fa3-4395-a69e-f071e0c00b3d';
// //   const fileStream = await this.getFileStream(uniqueKey);
// //   console.log(fileStream);
// //   fileStream.pipe(fs.createWriteStream('downloaded-file.ext'));
// // })();


// utils/s3.js
const { MongoClient } = require('mongodb');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid'); // Import uuidv4 function

const uri = process.env.MONGO_URI; // Update with your MongoDB URI
const dbName = process.env.DATABASE_NAME; // Update with your database name
const mongodb = require('mongodb');

// Upload multiple files to MongoDB GridFS
exports.uploadFiles = async (files) => {
  const client = new MongoClient(uri, { useUnifiedTopology: true });

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(dbName);
    const bucket = new mongodb.GridFSBucket(db, { bucketName: 'uploads' });

    const uniqueKeys = files.map(() => uuidv4()); // Generate unique UUIDs for each file

    const uploadPromises = files.map(async (file, index) => {
      const fileStream = fs.createReadStream(file.path);
      const uploadStream = bucket.openUploadStream(uniqueKeys[index]);

      fileStream.pipe(uploadStream);

      return new Promise((resolve, reject) => {
        uploadStream.on('finish', resolve);
        uploadStream.on('error', reject);
      });
    });

    await Promise.all(uploadPromises);

    console.log('Files uploaded successfully with keys:', uniqueKeys);
    return uniqueKeys;
  } catch (error) {
    console.error('Error:', error);
  } finally {
    client.close();
  }
};

// Get a file from MongoDB GridFS by its key
exports.getFileStream = async (fileKey) => {
  const client = new MongoClient(uri, { useUnifiedTopology: true });

  try {
    await client.connect();

    const db = client.db(dbName);
    const bucket = new mongodb.GridFSBucket(db, { bucketName: 'uploads' });

    const downloadStream = bucket.openDownloadStreamByName(fileKey);

    return downloadStream;
  } catch (error) {
    console.error('Error:', error);
  }
};
