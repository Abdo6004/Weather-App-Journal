// Setup empty JS object to act as endpoint for all routes
projectData = {};
// Confi of packages
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());
// Sending data to server
app.post('/Post', function (request,response){
    projectData=request.body;
    response.send(projectData);
    console.log(projectData);
}) 

// Getting Data from server
app.get('/Get',function (request,response){
    response.send(projectData);
});

// Setup Server
const port =8080;
app.listen(port, function(){
    console.log(`Server is Running on http://localhost:${port}`);
});
// Main project folder
app.use(express.static('website'));

