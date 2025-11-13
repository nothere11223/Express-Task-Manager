const express = require("express");
const router = express.Router();

let tasks = [];
let id = 1;

router.get("/", (req, res) => {
  res.json(tasks);
});

router.post("/", (req, res) => {
  const title = req.body.title;
  if (!title) return res.status(400).json({ message: "Title is required" });

  const newTask = { id: id++, title, completed: false };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

router.put("/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const { title, completed } = req.body;
  const task = tasks.find(t => t.id === taskId);
  if (!task) return res.status(404).json({ message: "Task not found" });

  if (title) task.title = title;
  if (completed !== undefined) task.completed = completed;
  res.json(task);
});

router.delete("/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const exists = tasks.some(t => t.id === taskId);
  if (!exists) return res.status(404).json({ message: "Task not found" });

  tasks = tasks.filter(t => t.id !== taskId);
  res.json({ message: "Task deleted" });
});

module.exports = router;
