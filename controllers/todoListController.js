const todoList = require("../models/todoListSchema");

const createTask = async (req, res) => {
  try {
    const { title, description, completed, priority, dueDate, category } =
      req.body;
    if (!title) {
      return res.send({ error: "Title is Required" });
    }
    const task = await new todoList({
      userId: req.user._id,
      title,
      description,
      completed: completed || false,
      priority: priority || "medium",
      dueDate,
      category,
    }).save();

    res.status(201).send({
      success: true,
      message: "Task Created Successfully",
      task,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error,
    });
  }
};

const readTask = async (req, res) => {
  try {
    const tasks = await todoList
      .find({ userId: req.user._id })
      .sort({ completed: -1 });

    // Send response
    res.status(201).json({
      success: true,
      message: "Task fetcha successfully",
      tasks,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error,
    });
  }
};

const updateTask = async (req, res) => {
  console.log(req.params.id);
  console.log(req.body);
  try {
    const { title, description, completed, priority, dueDate, category } =
      req.body;
    // Create a newTask object

    if (!title) {
      return res.send({ error: "Title is Required" });
    }

    const newTask = {};
    if (title) {
      newTask.title = title;
    }
    if (description) {
      newTask.description = description;
    }
    if (completed) {
      newTask.completed = completed;
    }
    if (priority) {
      newTask.priority = priority;
    }
    if (dueDate) {
      newTask.dueDate = dueDate;
    }
    if (category) {
      newTask.category = category;
    }

    // Find the task to be updated
    let task = await todoList.findById(req.params.id);
    if (!task) {
      return res.status(404).send("Task not found");
    }

    // Check if the user is authorized to update the task
    if (task.userId.toString() !== req.user._id) {
      return res.status(401).send("Not allowed");
    }

    // Update the task
    task = await todoList.findByIdAndUpdate(
      req.params.id,
      { $set: newTask },
      { new: true }
    );

    // Send response
    res.status(201).json({
      success: true,
      message: "Task updated successfully",
      task,
    });
  } catch (error) {
    // Handle errors
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    // Find the note to be delete and delete it
    let deleteTask = await todoList.findById(req.params.id);
    if (!deleteTask) {
      return res.status(404).send("Not Found");
    }

    // Allow deletion only if user owns this Note
    if (deleteTask.userId.toString() !== req.user._id) {
      return res.status(401).send("Not Allowed");
    }

    deleteTask = await todoList.findByIdAndDelete(req.params.id);

    res.status(201).json({
      success: true,
      message: "Task Deleted successfully",
      deleteTask,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = { createTask, updateTask, readTask, deleteTask };
