// Write your "actions" router here!
const express = require("express")
const Action = require("./actions-model")

const {validActionID,checkActionID } = require('./actions-middlware')


const router = express.Router()

router.get('/', async (req,res, next) => {
    try {
        const actions = await Action.get()
        res.status(200).json(actions)
    } catch (error) {
        next(error)
    }
})

router.get('/:id', checkActionID, (req,res) =>{
    res.json(req.action)
})

router.post('/',validActionID, async (req,res,next) =>{
    const newAction = await Action.insert({
        notes: req.notes,
        description: req.description,
        project_id: req.project_id
    })
    res.status(201).json(newAction)

})

router.put('/:id', validActionID, async (req,res, next) =>{
    try {
        const updatedAction = await Action.update(req.params.id, req.body)
        res.status(201).json(updatedAction)
        
    } catch (error) {
        
        next(error)
    }
})


router.delete('/:id', checkActionID, async (req,res,next) => {
    try {
        const deletedAction = await Action.remove(req.params.id)
        res.status(200).json(deletedAction)
    } catch (error) {
        
        next(error)
    }
})
module.exports = router