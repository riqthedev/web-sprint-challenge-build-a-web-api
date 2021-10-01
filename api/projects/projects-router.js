// Write your "projects" router here!
const express = require('express')
const Project = require('./projects-model')
const Action = require('../actions/actions-model')
const {checkProjectId,validProject } = require('./projects-middleware')

const router = express.Router();

router.get('/:id/actions', async (req,res, next) => {
    try {
        const projectActions = await Project.getProjectActions(req.params.id)
        res.status(200).json(projectActions)
        
    } catch (error) {
        
        next(error)
    }
})


router.get('/', async (req,res, next) => {
 try {
     const projects = await Project.get()
     res.status(200).json(projects)
     
 } catch (error) {
     next(error)
 }

})


router.get('/:id', checkProjectId,  (req,res) => {

    res.json(req.project)
})


router.delete('/:id', checkProjectId, async (req,res, next) =>{
    try {
        const deletedID = await Project.remove(req.params.id)
        res.status(200).json(deletedID)
        
    } catch (error) {
        
        next(error)
    }
})


router.post("/", validProject,   async (req,res) => {
 try {
     const newProject = await Project.insert({
         name: req.name,
         description: req.description,
         completed: req.completed
     })
     res.status(201).json(newProject)
     
 } catch (error) {
  
    next(error)
 }
}) 


router.put ('/:id', validProject, async (req,res, next) =>{
try {
    const updatedProject = await Project.update(req.params.id, req.body)
    res.status(201).json(updatedProject)
} catch (error) {
    
    next(error)
}
})
module.exports = router