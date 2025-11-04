// src/pages/Tasks.jsx
import React, { useEffect, useState } from "react";
import API from "../api/axiosInstance";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Fetch all tasks for the logged-in user
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const { data } = await API.get("/tasks");
      setTasks(data.tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      alert("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Add a new task
  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      const { data } = await API.post("/tasks", { title });
      setTasks((prev) => [...prev, data.task]);
      setTitle("");
    } catch (error) {
      console.error("Error adding task:", error);
      alert("Failed to add task");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div style={{ padding: "24px" }}>
      <h2>Your Tasks</h2>

      {/* Add task form */}
      <form onSubmit={handleAddTask} style={{ marginTop: "16px", marginBottom: "24px" }}>
        <input
          type="text"
          placeholder="Enter task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ padding: "8px", width: "250px" }}
        />
        <button type="submit" style={{ padding: "8px 16px", marginLeft: "8px" }}>
          Add Task
        </button>
      </form>

      {/* Tasks list */}
      {loading ? (
        <p>Loading tasks...</p>
      ) : tasks.length === 0 ? (
        <p>No tasks yet. Add one above 👆</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task._id}>
              {task.title} {task.completed ? "✅" : ""}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Tasks;
