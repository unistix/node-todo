const mongoose = require('mongoose')

/*const connectionString = "mongodb+srv://john:1234@nodeexpressprojects.t642fwi.mongodb.net/03-TASK-MANAGER?retryWrites=true&w=majority"*/


const connectDB = (url) =>{
	return mongoose.connect(url, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false,
		useUnifiedTopology: true,
	}).then(()=> console.log('CONNECTED TO THE DB...'))

}


	
/*
.then(()=> console.log('CONNECTED TO THE DB...'))
	.catch((err) => console.log(err))*/

module.exports = connectDB