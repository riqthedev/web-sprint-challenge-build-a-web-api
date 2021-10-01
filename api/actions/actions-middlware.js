// add middlewares here related to actions
const Action = require('./actions-model')
const Project = require('../projects/projects-model')

async function checkActionID (req, res, next)  {
    try {
        const validID = await Action.get(req.params.id)
        if (validID) {
            req.action = validID
            next()
        } else{
            next({ status: 404, message: "ID not found "})
        }
    } catch (error) {
        
        next(error)
    }
}

async function validActionID (req, res, next) {
  const {notes, description, project_id} = req.body
  if (!notes || !notes.trim() || !description || !description.trim() || !project_id){

    next({
        status: 400,
        message: "Missing Required Fields!"
    })
  } else {
      req.notes = notes.trim(),
      req.description = description.trim(),
      req.project_id = project_id
      next()
  }
 
}



module.exports = { checkActionID, validActionID}