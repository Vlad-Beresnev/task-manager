const Task = require('../models/Task')

// Model.find({})
const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find({})
        res.status(200).json({ tasks })
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}

// Model.create()
const createTask = async (req, res) => {
    try {
        const task = await Task.create(req.body)
        res.status(201).json({ task })
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}

// Model.findOne()
const getTask = async (req, res) => {
    try {
        const { id: taskID } = req.params
        const task = await Task.findOne({ _id: taskID });
        // if the ID is not found but sintax is correct
        if (!task) {
            return res.status(404).json({ msg: `No task with id : ${taskID}` });
        }
        res.status(200).json({ task })
    } catch (error){
        res.status(500).json({ msg: error })
    }
    
}

// Model.findOneAndDelete()
const deleteTask = async (req, res) => {
    try {
        const { id: taskID } = req.params;
        const task = await Task.findOneAndDelete({ _id: taskID});
        if (!task) {
            return res.status(404).json({ msg: `No task with id : ${taskID}` })
        }
        res.status(200).json({ task })
        // examples how to do the same but another way:
        // res.status(200).send()
        // res.status(200).json({ task: null, status: 'success'} )
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}

// Model.findOneAndUpdate()
const updateTask = async (req, res) => {
    try {
        const { id: taskID } = req.params;

        const task = await Task.findOneAndUpdate({ _id: taskID}, req.body, {
            new: true,
            runValidators: true,
        })

        if (!task) {
            return res.status(404).json({ msg: `No taskwith id : ${taskID}` })
        }

        // if you are updating something, you should get a new info
        res.status(200).json({ task })
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}



module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask,
}