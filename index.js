var Express = require('express');
var MongoClient = require('mongodb').MongoClient;
var cors = require('cors');
const multer = require('multer');

var app = Express();
app.use(cors());

//var CONNECTION_STRING = "mongodb://localhost:27017/";
var CONNECTION_STRING = "mongodb+srv://estefanocastillo:patita75@cluster0.puakb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0&ssl=true";
var DATABASE_NAME = "todoappdb";
var database;

app.listen(5038, () => {
  MongoClient.connect(CONNECTION_STRING, (error, client) => {    
    database = client.db(DATABASE_NAME);
    console.log("Connected to `" + DATABASE_NAME + "`!");
  });    
});

//Método GetNotes
app.get('/api/todoapp/GetNotes', (request, response) => {
  database.collection("todoappcollection").find({}).toArray((error, result) => {
     response.send(result);
  });  
});

//Método AddNotes
app.post('/api/todoapp/AddNotes', multer().none(), (request, response) => {
  database.collection("todoappcollection").count({},function(error, numOfDocs){
     database.collection("todoappcollection").insertOne({
        id: (numOfDocs + 1).toString(),        
        description: request.body.newNotes
     });
  });
  
  response.json("Added Succesfully");
});

//Método DeleteNotes
app.delete('/api/todoapp/DeleteNotes', (request, response) => {
  database.collection("todoappcollection").deleteOne({
     id: request.query.id  
  });  

  response.json("Deleted Succesfully");
});