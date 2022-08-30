//seperating routes and controllers keeps apps.js file tidy
const Task = require('../models/tasks')
const asyncWrapper = require('../middleware/async')
const {createCustomError} = require('../errors/custom-error')



const getAllTasks = asyncWrapper( async (req,res) => {
	//res.send('all items from file')

		const tasks = await Task.find({})
		//res.send('create task')
		//res.status(200).json({tasks})
		res.status(200).json({tasks, amount:tasks.length}) //can also include number of tasks
		//res.status(200).json({status:'success', data:{tasks, amount: tasks.length}})//flag 

	

		//res.status(500).json({msg:error})

	
})


const createTask = asyncWrapper(async (req, res) => {
	

	
		const task = await Task.create(req.body)
		//res.send('create task')
		res.status(201).json({ task}) //body contents of the post request




	

		//res.status(500).json({msg:error})

	
})

const getTask = asyncWrapper(async (req, res, next) => {

	//res.send('get single task')
	//res.json({id:req.params.id}) //set the value for key id to the param passed in from the url 

	
		const {id:taskID} =req.params
		const task = await Task.findOne({_id:taskID})
		if(!task){

			/*const error = new Error('Not found')
			error.status = 404;
			return next(error)*/

			return next(createCustomError(`No task with id: ${taskID}`,404))
			//return res.status(404).json({msg:`No task with id: ${taskID}`})
		}


		res.status(200).json({task}) //set the value for key id to the param passed in from the url 

	
		//res.status(500).json({msg:error})


	
})



const deleteTask = asyncWrapper(async (req, res) => {

	//res.send('delete task')
	
		const{id:taskID} = req.params;
		const task = await Task.findOneAndDelete({_id:taskID});
		if(!task){
			return next(createCustomError(`No task with id: ${taskID}`,404))
		}
		res.status(200).json({task: null, status: 'task deleted succesfully'}) //set the value for key id to the param passed in from the url  if we are successful
	
	
		//res.status(500).json({msg:error})
	
})

const updateTask = asyncWrapper(async (req, res) => {

	//res.send('update task')
	
		const {id:taskID}= req.params;

		const task = await Task.findOneAndUpdate({_id:taskID}, req.body,{
			new: true,
			runValidators: true,


		})
		if(!task){
			return next(createCustomError(`No task with id: ${taskID}`,404))
		}

		res.status(200).json({task})


	
		//res.status(500).json({msg:error})
	
})


module.exports = {
	getAllTasks,createTask,getTask,updateTask,deleteTask
}