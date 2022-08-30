const asyncWrapper = (fn) => {
	return async(req,res,next) => {
		try{
			await fn(req, res, next)
			
		}catch (error){
			next(error) //passing to next middle ware 
		}

	}

}

//use await syntax without repeatingt ry catch blocks 
module.exports = asyncWrapper