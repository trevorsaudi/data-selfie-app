const express  = require('express')
const Datastore  = require('nedb');
const app = express(); //creating the web application through express
app.listen(3000, () => console.log('listening at 3000...'))
app.use(express.static('public')); //hosting static files  
app.use(express.json({limit: '1mb'}));

const database = new Datastore('latestnode.db');
database.loadDatabase();

app.get('/api', (request, response) =>{
	database.find({}, (err, data) =>{
		if(err) {
			response.end();
			return;
		}
	response.json(data);
})
});



app.post('/api' , (request, response) =>{
	console.log('i got a request')
	const data = request.body;
	const timestamp = Date.now();
	data.timestamp = timestamp;
	database.insert(data);
	response.json(data);

});

