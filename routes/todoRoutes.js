const express = require("express");
const { createTask, readTask, updateTask, deleteTask } = require("../controllers/todoListController");
const requireSignIn = require("../middlewares/authMiddleware");


const router = express.Router();

router.post('/create-task', requireSignIn , createTask)
router.get('/read-task' , requireSignIn , readTask)
router.patch('/update-task/:id' , requireSignIn, updateTask)
router.delete('/delete-task/:id' ,requireSignIn, deleteTask)

module.exports = router;