

//console.log('Task Manager App');
const express = require('express');
const app = express();
const tasks = require('./routes/tasks')
const connectDB = require('./db/connect')
require('dotenv').config()
const notFound = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')



//middleware
app.use(express.static('./public'))
app.use(express.json())



//routes
/*
app.get('/hello',(req, res) => {
	res.send('Task Manager App');
})*/

app.use('/api/v1/tasks', tasks) //using middleware to look for api version 1 then pass in tasks router
app.use(notFound)
app.use(errorHandlerMiddleware)

//app.use('/api/v1/tasks', tasks) //using middleware to look for api version 1 then pass in tasks router


//sending json and needs data to be accessible 

/*

/api is convention for dictating api functionality vs website
/v1 means you can redirect people to new versions rather than changing the same one
/:id 

app.get('/api/v1/tasks') - Get all the tasks
app.post('api/v1/tasks') - Create a new task
app.get('api/v1/tasks/:id') - get single task - :id is params
app.patch('api/v1/tasks/:id') - update task
app.delete('api/v1/tasks/:id') - delete task
*/



const port = process.env.PORT || 3000; //if set use value if not use 3000

const start = async () => {
	try{
		await connectDB(process.env.MONGO_URI)
		app.listen(port, console.log(`Server is listening at http://localhost:${port}...` ));


	}catch (error){
		console.log(error)
	}
}

start()


/*

Print Hello world and post information to local port
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/hello',(req, res) => { //create a second page to route to 
	res.send('Home')
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`)) */



