const express = require('express');
const bodyParser =  require('body-parser');
const cors = require('cors');

const PORT = 3000

const app  = express();

app.use(bodyParser.json());

app.use(cors());

app.get('/',function(req,resp){
	resp.send('Hello from server!!!');
})

app.post('/enroll', function(req,resp){
	console.log(req.body);
	resp.status(200).send({"message":"Data Received"});
	//resp.status(401).send({"message":"Data Received"});
})

app.listen(PORT, function(){
	console.log("Server running on localhost:"+PORT);
})