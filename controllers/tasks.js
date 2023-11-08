const Task = require('../models/Task')
const asyncWrapper = require('../middleware/async')
const { createCustomError } = require('../errors/custom-error')

// Model.find({})
const getAllTasks = asyncWrapper( async (req, res) => {
    // res.status(200).json({ tasks, amount:tasks.length })
    // res.status(200).json({ status: "success", data: { tasks, nbHits: tasks.length } })
    const tasks = await Task.find({})
    res.status(200).json({ tasks })
})

// Model.create()
const createTask = asyncWrapper( async (req, res) => {
    const task = await Task.create(req.body)
    res.status(201).json({ task })
})


// Model.findOne()
const getTask = asyncWrapper( async (req, res, next) => {
    const { id: taskID } = req.params
    const task = await Task.findOne({ _id: taskID });
    // if the ID is not found but sintax is correct
    if (!task) {
        return next(createCustomError(`No task with id : ${taskID}`, 404))
    }
    res.status(200).json({ task })
})

// Model.findOneAndDelete()
const deleteTask = asyncWrapper( async (req, res) => {
    const { id: taskID } = req.params;
    const task = await Task.findOneAndDelete({ _id: taskID});
    if (!task) {
        return next(createCustomError(`No task with id : ${taskID}`, 404))
    }
    // examples how to do the same but another way:
    // res.status(200).send()
    // res.status(200).json({ task: null, status: 'success'} )
    res.status(200).json({ task })
})

// Model.findOneAndUpdate()
const updateTask = asyncWrapper( async (req, res) => {
        const { id: taskID } = req.params;

        const task = await Task.findOneAndUpdate({ _id: taskID}, req.body, {
            new: true,
            runValidators: true,
        })

        if (!task) {
            return next(createCustomError(`No task with id : ${taskID}`, 404))
        }

        // if you are updating something, you should get a new info
        res.status(200).json({ task })
})



module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask,
}