const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// const uri = 'mongodb+srv://OMITTED@cluster0.xvnqv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const uri = 'mongodb+srv://fdplazaa:Rishu12345@cluster0.48xj2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(uri,{useNewUrlParser:true,useCreateIndex:true,useUnifiedTopology:true}
    );
const connection = mongoose.connection;
connection.once('open',() =>{
console.log("mongoDB database connection established successfully");
})
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});