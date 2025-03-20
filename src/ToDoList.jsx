import React, { useEffect, useState } from "react";


function ToDoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [deletedTaskIds, setDeletedTaskIds] = useState([]);
  //edit
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState(null);
  const [editTaskName, setEditTaskName] = useState("");

    // ดึงข้อมูล task เมื่อ component mount

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/tasks");
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const addTask = async () => {
    if (newTask.trim() !== "") {
      try {
        const response = await fetch("http://localhost:5000/api/tasks", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: newTask, completed: false }),
        });
        if (response.ok) {
          const createdTask = await response.json();
          setTasks([...tasks, createdTask]);
          setNewTask("");
          fetchTasks();
        } else {
          console.error("Failed to add task");
        }
      } catch (error) {
        console.error("Error adding task:", error);
      }
    }
  };
// เปิด modal แก้ไข task
const openEditModal = (task) => {
  setCurrentTaskId(task.id);
  setEditTaskName(task.name);
  setEditModalVisible(true);
};

// ปิด modal
const closeEditModal = () => {
  setEditModalVisible(false);
  setCurrentTaskId(null);
  setEditTaskName("");
};

// บันทึกการแก้ไข task
const saveEditedTask = async () => {
  try {
    const response = await fetch(`http://localhost:5000/api/tasks/${currentTaskId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: editTaskName }),
    });
    if (response.ok) {
      const updatedTask = await response.json();
      setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
    } else {
      console.error("Failed to update task");
    }
  } catch (error) {
    console.error("Error updating task:", error);
  }
  closeEditModal();
};
   // ลบ task 
   const deleteTask = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/tasks/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setDeletedTaskIds([...deletedTaskIds, id]);
        fetchTasks();
      } else {
        console.error("Failed to delete task");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // อัปเดต task (ตัวอย่าง: toggle completed)
  const toggleTaskCompleted = async (task) => {
    try {
      const response = await fetch(`http://localhost:5000/api/tasks/${task.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: task.name, completed: !task.completed }),
      });
      if (response.ok) {
        const updatedTask = await response.json();
        setTasks(tasks.map((t) => (t.id === task.id ? updatedTask : t)));
      } else {
        console.error("Failed to update task");
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };
  const handleEditInputChange = (e) => {
    setCurrentTask({ ...currentTask, name: e.target.value });
  };

  const handleEditClick = (task) => {
    setIsEditing(true);
    setCurrentTask({ id: task.id, name: task.name });
  };

  const handleUpdateTask = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/tasks/${currentTask.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: currentTask.name }),
      });
      if (response.ok) {
        const updatedTask = await response.json();
        setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
        setIsEditing(false);
        setCurrentTask({ id: null, name: "" });
      } else {
        console.error("Failed to update task");
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };
  const editTask = async (id, currentName) => {
    const newName = prompt("แก้ไขชื่อ task:", currentName);
  };

  return (
    <div className="to-do-list">
      <h1>To-Do-List</h1>
      <div>
        <div className="input">
          <input
            type="text"
            placeholder="Enter a task...."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button className="add-button" onClick={addTask}>
            Add
          </button>
        </div>
      </div>
  
      <ol>
        {tasks.map((task, index) => (
          <li key={task.id}>
            <span className="text">{task.name}</span>
            <button className="completed-button" onClick={() => toggleTaskCompleted(task)}>
            {task.completed ? "" : "✔"}
            </button>
            <button className="edit-button" onClick={() => openEditModal(task)}>
              Edit
            </button>
            <button className="delete-button" onClick={() => deleteTask(task.id)}>
              Delete
            </button>
          </li>
        ))}
      </ol>
  
      {editModalVisible && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Edit Task</h3>
            <input
              type="text"
              value={editTaskName}
              onChange={(e) => setEditTaskName(e.target.value)}
            />
            <div className="modal-actions">
              <button className="save" onClick={saveEditedTask}>
                Save
              </button>
              <button style={{ backgroundColor: "red", color: "white", padding: "8px 16px", border: "none", borderRadius: "4px" }} onClick={closeEditModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
  }
  
  export default ToDoList;
  