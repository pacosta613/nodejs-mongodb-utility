# nodejs-mongodb-utility
This is a Node.js project that utilizes MongoDB as its database. The project allows users to perform CRUD (create, read, update, delete) operations on a MongoDB database using a RESTful API.


To use add the `db` folder to your project and require it. 

Update `.config/db.js` to the path of your db 

You'll need to add your mongodb url and collection name to the `db.js` file. 

    var url = "mongodb://localhost:27017/your-db-name";
    var collectionName = "your-collection-name";

Then require the module in your project and pass in the url and collection name.
