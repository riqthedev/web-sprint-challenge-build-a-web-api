// add middlewares here related to projects
const Project = require("./projects-model")

async function checkProjectId(req,res, next) {
    try {
        const validId =  await Project.get(req.params.id)
        if(validId) {
            req.project = validId
            next()
        } else {
            next({status: 404, message:"not valid id"})
        }
        
    } catch (error) {
        next(error)
    }
}

function validProject (req,res, next) {
    const {name, description, completed} = req.body
    

    if (!name || !name.trim() || !description || !description.trim() || typeof completed !== 'boolean') {
        next({
            status:400,
            message: "Required fields missing!"
        })
    } else {
        req.name = name.trim(),
        req.description = description.trim(),
        req.completed = completed
        next()
    }
}






module.exports ={
    checkProjectId,
    validProject,
  
    
}
