const Task = require("../models/tasks");

//Creating new Task
const createTask = async (req, res) => {
    try {
        const { title, description } = req.body;

        const task = await Task.create({
            user: req.user._id,
            title,
            description
        });

        res.status(201).json({ message: "Task successfully created", task });
    } catch (err) {
        console.error("Error creating task", err);
        res.status(500).json({ message: "Server error" });
    }
};

//Getting all tasks by loggedIn user
const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user._id });
        res.status(200).json({ tasks });
    } catch (err) {
        console.error("Error fetching tasks", err);
        res.status(500).json({ message: "Server error" });
    }
}

//Update task by ID
const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, status } = req.body;

        const task = await Task.findOneAndUpdate(
            { _id: id, user: req.user._id },
            { title, description, status },
            { new: true }
        );

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json({ task });
    } catch (error) {
        console.error("Error updating task:", error);
        res.status(500).json({ message: "Server error" });

    }
};

//Delete task by ID
const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findOneAndDelete(
            {_id: id, user: req.user._id}
        )

        if (!task) {
            res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json({ "deleted Task": task });
    } catch (error) {
        console.error("Error deleting task", error);
        res.status(500).json({ message: "Server error" });
    }
}


module.exports = {
    createTask,
    getTasks,
    updateTask,
    deleteTask
}